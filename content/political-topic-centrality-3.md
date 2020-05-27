---
title: "Analyzing Political Polarization: Topic Centrality"
slug: "political-topic-centrality-3"
emoji: "🏛"
blurb: "Extending graph centrality to show how different political messages affect the flow of information. The final part in a series posted on the popular blog <a aria-label='Towards Data Science'href='https://towardsdatascience.com/'>Towards Data Science</a>."
tags: ["bp", "gt"]
link: "<a aria-label='Blog' href='https://towardsdatascience.com/analyzing-political-polarization-topic-centrality-dfc402b9fb1d'>Blog</a>"
date: "05-28-2020"
prod: true
---

![All the tweets of political leaders, and their retweets, leading up to Canada’s 2019 federal election](https://cdn-images-1.medium.com/max/6000/1*dlDjeRQMuZoexm-onCcAuw.png)*All the tweets of political leaders, and their retweets, leading up to Canada’s 2019 federal election*

Alex Pentland, director of MIT’s [Connection Science](http://connection.mit.edu/) initiative and former director of the MIT [Media Lab,](https://www.media.mit.edu/) argues that information flows across networks in a way very similar to the flu. Those who weren’t previously sick, but are repeatedly exposed to those who are, become increasingly likely to ‘catch it’ and go on to spread it to others. The same goes for ideas. As we are exposed to different viewpoints and perspectives, we have a propensity towards ‘catching’ them, which influences are friends and family (our little part of the larger network). This can go on in a cascading affect that disperses information across the entire network. **In this article we will look at political polarization as a function of the flow of ideas in a network.** Specifically, we will see that depending on what a tweet is about, it can ‘spread’ very differently.

Some types of tweets spread in very narrow circles, and are only retweeted by the supporters of a party leader. These are what we called *bonding messages*, as they concentrate the spread of information within a particular group (in this case, the supporters of some political party). Other types of tweets spread across the entire network, as they are retweeted by a more diverse range  of individuals. We called these *bridging messages*, as they span demographics when spreading information. **If we take the idea that political polarization is fundamentally a lack of empathy for those with different viewpoints, then knowing what types of messages increase the spread of ideas across the political landscape is important.** To do this we will explore and extend the concept of graph centrality; if the word centrality isn’t familiar to you, don’t worry, we’ll start from the ground up.

### A Quick Recap

As a reminder from my previous articles on [engagement graphs](https://towardsdatascience.com/analyzing-political-polarization-on-twitter-engagement-graphs-aa0614ed1361) and [topic modelling,](https://towardsdatascience.com/analyzing-political-polarization-topic-modelling-65c6d25b2600) we’re trying to achieve a better understanding of how politically active Twitter users engage  with the different types of messages that party leaders put out. The case study that we’re using is Canada’s 2019 federal election, and all of the English tweets and retweets put out in the preceding year. We created a massive network, seen above, that shows the 5 party leaders, hidden in the center of each cluster; all of the tweets that they put out, colored according to topic; and all of the users who retweeted on of the party leaders tweets. These users are the light-blue vertices. In total we ended up with 7,978 tweets, and 113,293 retweets spread out among 36,450 users.

Since we’re looking at the bridging or bonding characteristics of different *messages*, we had to group all of the ~8,000 tweets by topic. To do this we turned to an unsupervised machine learning technique called the latent Dirichlet allocation (LDA). LDAs take in a collection of documents, in this case tweets, and represents each document as some distribution of *k* topics in a way that best preserves the semantics of the document. In our case, the most performant LDA was able to extract 7 topics from the body of tweets. By assigning each tweet as the topic that it is closest to, each tweet was assigned to one of these 7 topics. To recap, these topics are:

* Topic 1: campaign messages, rallies and logistics.

* Topic 2: carbon taxes, pipelines and the economy.

* Topic 3: the SNC Lavalin scandal.

* Topic 4: appeals to the middle-class.

* Topic 5: celebratory messages, as well as tweets regarding national holidays and days of remembrance.

* Topic 6: immigration, diversity and free speech.

* Topic 7: healthcare, abortion and pharmacare.

### What is Graph Centrality

Graph’s are a way of representing relationships, called edges, between various things, called vertices. I’ve been calling the header image a network, which in my opinion is a more intuitive descriptor, but generally in mathematics the network we’ve built would be referred to as a graph. **Measures of graph centrality aim to find important vertices within a graph**. This can be done in a variety of ways; the simplest would be to count the number of edges that each vertex has — and say that the greater number of connections, the higher the centrality score. This is useful in our case because we can then quantify how important tweets of different topics were. But we are going to take a more nuanced approach than just counting the number of retweets per tweet. For this we will look at Eigenvector centrality, which says that it’s not only the number of retweets that matter, but *having retweets from really active Twitter users.* By expanding this concept we’ll arrive at two variations of topic centrality: one which measures how important a topic was, on average, in the entire network — and one that measures how important a topic was, on average, to a specific party leader. The former is an indicator that the information in those tweets was spread broadly, while the latter indicates a concentration of information.

#### Eigenvector Centrality

As Newman lays out in his 2016, Mathematics of Networks:

> The eigenvector centrality [. . . ] accords each vertex a centrality  that depends both on the number and the quality of its connections: having a large number of connections still counts for something, but a vertex with a smaller number of high-quality contacts may outrank one with a larger number of mediocre contacts.¹

Similarly  with my [article](https://towardsdatascience.com/analyzing-political-polarization-topic-modelling-65c6d25b2600?source=post_page-----c169a8717ecf----------------------) where I discuss the LDA, I don’t want to get bogged down in the math that distracts from what we’re trying to achieve. So for now I will simply define the **eigenvector centrality of vertex *i* as *x<sub>i</sub>*, where *x<sub>i</sub>* is proportional to the average eigenvector centrality of *i*’s neighbors.** This way if a tweet vertex is retweeted by *highly engaged users*, it will have a higher eigenvector centrality. This is important because politically active Twitter  users are more likely to share content, attend a political rally and vote —but more importantly they *increase the flow of information in a network.*

### Topic Centrality

Topic centrality is a new technique that **aggregates the centrality scores for tweets of different topics.** For this study, we’ll say that  messages can serve two purposes: they can bridge communities, and diversify the flow of ideas, or they can bond communities, and concentrate the flow of ideas. In order to quantify this using our network we need two types of topic centrality, one that calculates how important tweets of a particular topic were to the *entire network* and one that calculates how important tweets of a topic were to *a party leader’s base*. The former is represented by total network topic centrality, and the latter is represented by party leader topic centrality. By comparing and contrasting the two we can get a full picture of how different topics influenced political discourse.

#### Total Network Topic Centrality

Total network topic centrality is an aggregate of the eigenvector centrality of all tweets of a certain topic in the entire engagement graph. For example, if we’re calculating the total network topic centrality for topic 2 — tweets about a carbon tax —  we would take the entire graph, calculate the eigenvector centrality for all of its vertices, and average the scores of the purple vertices which represent that topic. This is shown below. We can therefore define total network topic centrality for *topic v* in a *graph G* as the set below:

> *T<sub>v</sub>:= {x<sub>i</sub>,∀ i ∈ G| type(i) = tweet, topic(i) = v}*

![Process for total network topic centrality](https://cdn-images-1.medium.com/max/2718/1*LevnO62uPfmzryJEmXz0DA.png)*Process for total network topic centrality*

When taking the z-score centrality relative to other topics, a single number can be assigned to the relative importance of topic *v*.

#### Party Leader Topic Centrality

In order to measure how central a topic is to a party leader’s base, we needed a measure of  party leader topic centrality. **This assumes a world in which party leader *y* is the only actor users can engage with.** This done by removing all of the tweets by other party leaders, and all of the users who didn’t retweet something from that party leader, resulting in a subgraph of *G* which we’ll call *G<sub>y</sub>*.

> *P<sub>vy</sub> := {x<sub>i</sub>,∀ i ∈ G<sub>y</sub> | type(i) = tweet, topic(i) = v}*

After the subgraph *G<sub>y</sub>* is constructed, the party leader topic centrality *P<sub>vy</sub>* is defined as the set of all eigenvector centrality measures for tweet vertices of topic *v* in *G<sub>y</sub>*. The process for calculating Justin Trudeau’s party leader topic centrality for topic 4 is visualized in the image below.

![Process for party leader topic centrality](https://cdn-images-1.medium.com/max/4188/1*4Mc1UrGfSNEv0C6SMTPjcw.png)*Process for party leader topic centrality*

Similarly, by taking the z-score of *P<sub>vy</sub>* relative to the other topics that party leader promoted, a single centrality score can be assigned that measures how important topic *v* was to those who engaged with party leader *y*. This will be higher if it: has a high number of retweets and is retweeted by y’s *most engaged followers*. Highly active users who rarely engage with that specific party leader are discounted in this metric relative to someone who is less engaged, but concentrates their attention on that party leader’s content.

#### Putting everything together

![Tweets by Topic Breakdown](https://cdn-images-1.medium.com/max/2702/1*Shtw4hfWYbRB6b57UCgkwg.png)*Tweets by Topic Breakdown*

Previously, we saw how often the party leaders tweeted about certain topics, as indicated by the chart above. The below chart shows how effective the party leaders were at either: concentrating information among their supporters, or taking advantage of topics that spread information throughout Twitter. The horizontal axis represents party leader topic centrality, and the vertical axis represents total network topic centrality. Since every topic, regardless of the party leader, has the same total network topic centrality score — all points of the same topic lie on the same point vertically. Each point is colored according to the party leader and annotated with its topic.

![Total network vs party leader topic centrality](https://cdn-images-1.medium.com/max/2000/1*Vk_kNzFuCtqwDnbedBaBsA.png)*Total network vs party leader topic centrality*

What can we tell from this? For starters, while Maxime Bernier had almost 4.5x as many tweets about immigration (topic 6) as the other 4 candidates combined, these tweets had the lowest overall total network topic centrality and had his lowest party leader topic centrality.  Also, despite tweets pertaining to health care and pharmacare (topic 7) only making up 1% of all tweets, and their low total network centrality score, they had the highest engagement among Justin Trudeau’s supporters.

What else can we do with this information? **If we take a step back from the party leaders themselves, and average the party leader topic centrality scores by topic, we can get an idea of how the topics diffused or concentrated information.** This is shown in the chart below.

![Total network vs party leader topic centrality (averaged by topic)](https://cdn-images-1.medium.com/max/2000/1*G38QOj9lch_DjrEFjYGuqw.png)*Total network vs party leader topic centrality (averaged by topic)*

Here it is interesting to look at the lower right-hand and upper left-hand quadrants. The former indicates topics that are more important to a party leader’s base than to the entire network (topics 7, 4 and 1). Topic 1 — campaign messages— intuitively makes sense in this category; it is not surprising that messages about the campaign, where rallies are, *etc.* would be most important to a party leader’s base. Conversely, tweets in the upper left-hand quadrant indicates tweet topics that are more important to the overall network than to the individual network — which may be an indication of those topics spanning partisan divides (topics 2 and 3).

### So what

This series of posts has been a way to distribute my article, *[Bridging or Bonding? Measures of Topic Centrality for Online Political Engagement](https://github.com/cameron-raymond/CISC500-SeniorThesis/raw/master/topic_centrality_paper/Measures_of_Topic_Centrality_for_Online_Political_Engagement.pdf)*, to a wider audience. I spent my time writing these posts because these methods and statistics can uncover interesting facts about our political landscape in ways that are easily overlooked by existing models of political communication. They demonstrate statistically significant results that both the producer of the content *and the content itself*, are crucial in understanding how social media modulates political discourse and engagement. At a more granular level, it allows for the investigation, and confirmation, that certain messages are more important to the overall network, and certain messages are more important to individual party leaders’ bases. The key insight is that **these two categories do not necessarily overlap**. The topics that informed individuals of party events and campaign information, as well as appeals to individuals economic worries (topics 1 and 4 respectively) tended to drive engagement among a party leader’s supporters, but had less influence on the overall discourse. Conversely, issues that were pervasive in the public discourse, like the SNC Lavalin affair and discussion of a carbon tax, translated into the digital realm as well — and tended to be more important to the overall discourse. While all party leaders touched on these big “dinner table” topics, and presumably had differing stances on them, they were not the sole preserve of any one party. As a result engagement was more likely to cross party lines.

Returning back to our loose analogy between bridging and bonding social capital, and bridging and bonding messages. In an era that is characterized by a heightened sense of political polarization, it is useful to know how different types of messaging provoke different forms of political engagement¹. It is interesting to note that engagement surrounding policy issues like healthcare, while important, were often confined to the bubble of a political leader. Bonding social capital reinforces identities, and mobilizes solidarity — from a theoretical standpoint, it stands to reason that bonding messages may serve similar purposes². Bonding messages, in this case, concentrated the flow of information among a party leader’s supporters. Bridging messages, like bridging social capital, bring along weak ties, and diffuse information to a larger network of individuals. This can increase the diversity of information that people are exposed to, and has the potential to break down echo chambers.

And yet, more work needs to be done.

Even if a more diverse group of  people saw and engaged with tweets about carbon taxes, pipelines, and the SNC Lavalin scandal, that doesn’t mean that those people were learning from each other. In fact, if users were retweeting these comments but it lead to online conflict, then there could be negative consequences for political polarization. So while it is clear that you can affect the spread of information by controlling what you tweet, it is not clear how to best take advantage of this to bridge divides. However, this starting point is helpful in-and-of-itself, as **there’s no point in having the right message, if the wrong people see it.**

Thanks for sticking around for this series. I've had a lot of fun hearing different perspectives on this research and how it could be adapted! If you have thoughts yourself, feel free to reach out to me directly below.

[1]: Newman, Mark EJ. (2008). The mathematics of networks. *The new palgrave encyclopedia of economics*, 2(2008), 1–12.

[2]: Schipper, Burkhard C, & Woo, Hee. (2018). Political awareness, microtargeting of voters, and negative electoral campaigning. *Microtargeting of voters, and negative electoral campaigning (september 17, 2018)*.

[3]: Putnam, Robert D. (2000). Bowling alone: America’s declining social capital. *Pages 223–234 of: Culture and politics*. Springer.
