---
title: "Classifying Shakespeare: A Network Approach"
slug: "shakespeare-netlsd"
emoji: "🍿"
blurb: "By looking at the network of who speaks to whom in Shakespeares plays, this blog post shows that you are able to distinguish between comedies and tragedies without looking at the play's dialogue. Posted on <a aria-label='Towards Data Science'href='https://towardsdatascience.com/'>Towards Data Science</a>."
tags: ["bp", "gt"]
link: "<a aria-label='Blog' href='https://medium.com/@cameronraymond/5046530eb844?source=friends_link&sk=dbfc72d8c7f3173d8496d3b5ab0e3243'>Blog</a>"
date: "2020-06-18"
prod: true
---

![All of Shakespeare’s plays, in network form](https://cdn-images-1.medium.com/max/2000/1*uNiI3fHUS44j-QorVBxJUA.gif)*All of Shakespeare’s plays, in network form*

INTRO

* P1 Why networks are cool (justification for why this may work)

* They’re rich, interesting to look at, and allow for the exploration of relationships. That’s important because our relationships have a huge influence on our everyday lives. 

The problem: there isn’t an intuitive way to say if two networks are similar. They aren’t like numbers which are easy to compare. 

Thankfully there’s a lot of work being done to solve this problem, and this article is a short way to highlight one technique in particular, which we’ll get into in a minute.

* P2 hypothesis: Comedy’s and tragedies are very different —  not just in terms of the dialogue used, but in how the characters and scenes are structured in relation to each other. The challenge then is to show that by only looking at the structure of a Shakespearean play (IE who talks to who throughout the scenes) we can determine which of his plays are comedies and which are tragedies. 

Admittedly, this may seem odd at first. If you want to know a comedy from a tragedy, why wouldn’t you look at the actual dialogue? I would argue that not relying on language is an asset because while not everyone speaks the same language, **most stories are driven by  relationships between characters**. A network first approach gives us a more universal comparison of storytelling in a way that isn’t blocked by language barriers. NLP approaches need to not only know how to interpret different languages, but different uses of the same language! An NLP model that learns from *West Side Story* may have a hard time interpreting Shakespeare’s *Romeo and Juliet*, even though they’re both in English and follow identical story arcs. A network first approach has the potential to pick up on the relational similarities between the two, despite the generational gap. What we’ll test is if the relations between characters are distinct enough in Shakespeare’s comedies and tragedies to only need them when building a simple classification model.

## The Data 

* Look at the data (how many plays, how many lines of dialogue)

```python
import pandas as pd

plays_df = pd.read_csv("Shakespeare_data.csv")
# Drop stage directions (where there isn't an act/scene/line)
plays_df = plays_df[pd.notna(plays_df['ActSceneLine'])]
plays_df[['Act','Scene','Line']] = plays_df['ActSceneLine'].str.split('.',expand= True).astype(float)
plays_df = plays_df.drop('ActSceneLine',axis=1)

# Drop Shakespeare's histories
histories = ["King John", "Henry Iv", "Henry Vi Part 1", "Henry V",
            "Henry Vi Part 2", "Henry Vi Part 3", "Henry Viii",
            "Richard Ii", "Richard Iii"]
plays_df = plays_df[~plays_df["Play"].isin(histories)]

print("{} rows and {} columns".format(*plays_df.shape))
plays_df.head()
```

![](https://cdn-images-1.medium.com/max/2000/1*SUe3_PbkcZwIC1ihB8UTaw.png)

Let’s use Shakespeare’s 1623 play *All’s Well That Ends Well* as an example. First we’ll isolate for all the lines of dialogue in that play. Then we’ll  calculate how many often each character speaks and get rid of the those that speak less than 5 times.

```python
play_name = "Alls Well That Ends Well"

single_play = plays_df[(plays_df['Play'] == play_name)]

# Group the df by character to get how often each speak
characters = single_play.groupby(['Player']).size().reset_index()
characters.rename(columns = {0: 'Count'}, inplace = True)
# Get top 20 characters
characters = characters[characters["Count"] > 5]
```

Next we’ll create the network. We can do this by going scene by scene and adding adding a link between two characters if they speak in the same scene. The more times those characters  speak together in different scenes, the stronger their link will be.

```python
from itertools import combinations
from networkx import write_gpickle as write_g
import networkx as nx

play_graph = nx.Graph()
play_graph.add_nodes_from(top_characters["Player"])

# Group by Act/Scene and count how often each character spoke per scene 
scenes_df = single_play.groupby(['Act','Scene','Player']).size()
scenes_df = scenes_df[scenes_df["Player"].isin(characters["Player"])]
scenes_df.rename(columns = {0: 'Count'}, inplace = True)

# Go scene by scene
for (act,scene), counts in scenes_df.groupby(['Act','Scene']):
    # Get all the characters that are in that scene
    characters = counts["Player"].tolist()
    # If a scene contains characters [A,B,C] we want our graph to
    # contain the edges [(A,B),(A,C),(B,C)]
    pairs = list(combinations(characters,2))
    for (a_char, b_char) in pairs:
        if character_graph.has_edge(a_char, b_char):
            play_graph[a_char][b_char]['weight'] += 1
        else:
            play_graph.add_edge(a_char, b_char,weight=1)

write_g(play_graph, "./graphs/{}.gpickle".format(play_name))
```

Repeat 27 times and visualize and these are the resulting networks! Now all we need to do is find a way to distinguish between comedies and tragedies while only using these networks.

![](https://cdn-images-1.medium.com/max/2000/1*uNiI3fHUS44j-QorVBxJUA.gif)

## How to Compare Networks 

![The traditional way to compare networks.](https://cdn-images-1.medium.com/max/3782/1*mj4t4Qgu7NzJ7PMJbmeuaQ.png)*The traditional way to compare networks.*

* Like I said, this is a tricky problem without any intuitive solution

* Lots of existing options rely on the networks having the same number of nodes. The most common is GED which calculates how many links (edges) you would need to reassign before two networks are the same (isomorphic). Since both comedies  and tragedies can have a large or small number of characters this isn’t very helpful. 

![Two graphs with similar structures despite different densities. [Source](https://www.youtube.com/watch?v=aiPOa1NTgvM).](https://cdn-images-1.medium.com/max/2652/1*6RY31uhk5CKOw0Uw218LPg.png)*Two graphs with similar structures despite different densities. [Source](https://www.youtube.com/watch?v=aiPOa1NTgvM).*

To solve this problem we turn to a 2018 paper published in the *International Conference on Knowledge Discovery & Data Mining* that came up with a brilliant solution called the Network Laplacian Spectral Descriptor, or NetLSD for short. These researchers define that **two graphs are similar if information flows through them in similar ways over time¹.** They’re assumption is that information flows through a network similar to how heat diffuses throughout your air ducts. If each node in your network gives off some of its “heat” over time and passes it along the edges to its neighbors, then over time it will produce a signature that captures the network’s structure. So at each time step, all you have to do is sum up the amount of “heat” in the network. This is represented by  *h(t)* and is visualized as the y-axis in the image below. Since each heat trace signature uses the same number of time steps, it’s much easier to compare networks of different sizes. By using this technique they were able to identify between different types of proteins and enzymes with a high level of accuracy (94–95%)¹. 

![NetLSD Heat signatures for two similar graphs: Source: Tsitsulin et al.](https://cdn-images-1.medium.com/max/2478/1*Ft99g3Ecrk6WPm1E76LQ1Q.png)*NetLSD Heat signatures for two similar graphs: Source: Tsitsulin et al.*

While implementing NetLSD is relatively simple (especially if you use their [Python](https://pypi.org/project/NetLSD/) package) it does requires some background knowledge in how computers represent networks and linear algebra. For those who are interested here’s the [link](https://arxiv.org/abs/1805.10712) to the original paper. Since NetLSD’s inner workings aren’t crucial to our task of classifying comedies and  tragedies, I’ll move along.

## Putting Everything Together

* Split up play networks into priors and testing data (2:1 respectively)

```python
from sklearn.model_selection import train_test_split
from numpy import concatenate as concat

com = [“A Midsummer Nights Dream”, “A Comedy Of Errors”,
        “Taming Of The Shrew”,“Two Gentlemen Of Verona”,
        “Loves Labours Lost”, “The Tempest”,“A Winters Tale”,
        “Cymbeline”, “Pericles”,”Alls Well That Ends Well”,
        “Measure For Measure”, “Troilus And Cressida”,
        “Twelfth Night”,“As You Like It”,
        “Much Ado About Nothing”, “Merchant Of Venice”,
        “Merry Wives Of Windsor”]

trag = [“Macbeth”,”Titus Andronicus”, “Romeo And Juliet”,
        “King Lear”,“Hamlet”,”Othello”, “Julius Caesar”,
        “Antony And Cleopatra”, “Coriolanus”, “Timon Of Athens”]

data = np.array(com+trag)

# Labels are what we're trying to predict (comedy or tragedy) 
labels = concat([np.full(len(com), “c”),np.full(len(trag), “t”)])

priors, test_data, prior_labels, test_labels = train_test_split(data, labels, test_size=0.33)
```

* Calculate heat traces for priors

```python
import netlsd
from networkx import read_gpickle as read_g 

args = { "timescales": np.logspace(-2, 2, 250), "normalization": "empty" }

get_sig = lambda title: netlsd.heat(read_g("./graphs/{}.gpickle".format(title)),**args)

prior_sigs =[get_sig(title) for title in priors]
```

![Heat signatures for the prior observed plays (aka ‘training data’)](https://cdn-images-1.medium.com/max/2000/1*M7p1MtnXtXb-nFcVhxnqUg.png)*Heat signatures for the prior observed plays (aka ‘training data’)*

* when classifying from the testing data calculate its heat trace and look at the 5 priors with the closest heat trace signature. If the majority are comedies then we label that  play as a comedy, otherwise we classify it as a tragedy.  This is what’s called a k-nearest neighbor (KNN) classifier. KNNs don’t really model anything per say—  which is why I prefer the term priors to training data— but with so few plays to work with a KNN is a reasonable choice. 

```python
from netlsd import compare as l2_distance

def knn_predict(title, prior_sigs, prior_labels,k=5):
    graph_sig = get_sig(title)
    distances = [l2_distance(graph_sig,ps) for ps in prior_sigs]
    total = pd.DataFrame({"ptype": prior_labels, "dist": distances})
    total = total.sort_values("Distance From Input")
    return total["ptype"].head(k).mode()[0]

pred = [knn_predict(play,prior_sigs,prior_labels) for play in data_test]
```

So how’d we do? Well, **we were able to correctly classify 7 of the  9 plays in our testing data for a raw accuracy of 77.8%.** The testing set contained 7 comedies and 2 tragedies, and we were able to correctly classify all of the tragedies and 5/7 comedies. This shows that the networks that comedies and tragedies produce have distinct enough structures that we can tell which is which by only looking at the networks.

![Comedy/tragedy classification confusion matrix.](https://cdn-images-1.medium.com/max/2000/1*LW_8KmcdOQtSUOVec9B9hQ.png)*Comedy/tragedy classification confusion matrix.*

## So What?

While 27 plays is a super small sample, I’d argue that the principles of this experiment are sound. **A network first approach lets  us do something that, at first glance, seem pretty unlikely: we are able to figure out the genre of a play without looking at a single piece of dialogue.** Personally, I  think that is pretty cool. 

So are you saying this means we don’t care about NLP anymore? 

Obviously not. There’s a ton of rich information in language that we lose when we abstract something like a play into a network. However, networks give researchers flexibility to not rely on, or be bound by, language so much. This goes back to my example of comparing plays in different languages or from different time periods. The applications don’t stop at comparing plays or movies though; if it is possible to deduce information about communication networks without knowing what’s being said, then this could help encrypted messengers like WhatsApp curb networks that are conducive to hate speech? There is potential 

*Originally published at [https://cameronraymond.me](https://cameronraymond.me/blog/shakespeare-netlsd/).*

[1]: Tsitsulin, Anton, Davide Mottin, Panagiotis Karras, Alexander Bronstein, and Emmanuel Müller. “Netlsd: hearing the shape of a graph.” In *Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining*, pp. 2347–2356. 2018.
