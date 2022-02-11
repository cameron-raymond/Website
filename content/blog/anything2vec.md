---
title: "Anything2Vec: Mapping Reddit into Vector Spaces"
slug: "anything2vec"
emoji: "💥"
blurb: "Word2Vec is a powerful machine learning technique for embedding text corpus' into vector spaces. While useful for NLP problems, this blog post shows how it can also be used to represent and better understand communities on Reddit."
type: "bp"
tags: ["ml"]
collaborators: ["CSSLab"]
link: "<a aria-label='Blog' href='https://medium.com/@cameronraymond/anything2vec-mapping-reddit-into-vector-spaces-dcc77d9f3bea'>Blog</a>"
date: "2020-07-02"
prod: true
---

![“Subreddit Embedding” and the 100 closest subreddits to /r/nba](https://cdn-images-1.medium.com/max/3844/1*_FvvzFGBcS3eb5eXlKSMgg.png)*“Subreddit Embedding” and the 100 closest subreddits to /r/nba*

A common problem in ML, natural language processing (NLP), and AI at large surrounds representing objects in a way computers can process. And since computers understand numbers —  which we have a common language for comparing, combining and manipulating — this generally means assigning objects numbers in some fashion. Think taking something abstract but intuitive to humans, like the text of a book, and assigning each word in that book a unique number. That book could then be represented by the list, or vector, of numbers assigned to it. This is the process *of embedding that book as a vector —* and there is an increasingly rich literature of techniques for embedding objects as vectors.

While much of this literature focuses on representing *words* as vectors, which can aide in NLP problems, much of the logic can be transferred to embedding any arbitrary set of objects. Through my research at the University of Toronto, and their computational social science lab, I’ve been applying embedding techniques to understand online forums like Reddit. This article is meant to serve as a starting point to break down the research that is being done at UofT. For more information on my research check out [https://cameronraymond.me](https://cameronraymond.me), and for the original paper that this article is based on see [Waller, I., & Anderson, A](https://dl.acm.org/doi/abs/10.1145/3308558.3313729).

First, we’ll take a look at what it means to embed some *thing* as a vector and what a good embedding entails. Then we’ll take a common embedding technique, Word2Vec, and see how it is used to model words as vectors. After seeing why Word2Vec is so useful, we can start to generalize its principles and show its utility in mapping the different communities of Reddit.

## What is an embedding?

While embedding techniques can get complex —  at its core, to embed some *thing* is just to represent that *thing* as a vector of real numbers. This is useful because there’s a common currency when talking about vectors of real numbers; namely they are easy to  add, subtract, compare and manipulate. So to embed some *set* of objects then is just to represent those objects with *unique* vectors of real numbers. So not all embedding techniques involve complex neural nets, and often simple embeddings are powerful enough for a given problem; however, there are benefits to  more nuanced techniques that we’ll focus on.

A ‘dumb embedding’ would be to one-hot encode *all the different unique objects* as their own unit basis vector. This means that in a set of |*V*| objects, each object in that set, *v*, is represented as a vector of size |*V*| with all 0s, except for the *vth* index which is a 1.

![One-hot encoding of the words: red, yellow and green. Source: [Kaggle](https://www.kaggle.com/dansbecker/using-categorical-data-with-one-hot-encoding).](https://cdn-images-1.medium.com/max/2000/1*UOjWvDziH86T2MmiDpp98Q.png)*One-hot encoding of the words: red, yellow and green. Source: [Kaggle](https://www.kaggle.com/dansbecker/using-categorical-data-with-one-hot-encoding).*

Why might this not be a powerful enough embedding? Even though we have the tools to manipulate these vectors, it may not return intuitive results. This is because when objects are one-hot encoded, the embedding isn’t tied back to the real world in anyway. Specifically, there isn’t a logical relationship between objects’ representations that reflects their actual relationships; each vector is equally far from every other vector. In an ideal world, you may want the vector representing ‘red’ *([red]=<1 0 0>)* and the vector representing ‘yellow’ *([yellow]=<0 1 0>),* when added together, to return the vector representing ‘orange’ *([orange]-><1 1 0>).* One-hot encoding only lets you say what an item is by its vector, it doesn’t tell you how the vectors relate to one another. With that said, one-hot encoding is often a good starting point.

To understand how we can embed objects in a way *that is tied back to the real world* we’ll look at a more nuanced technique called Word2Vec. While generally used to embed words, it generalizes to arbitrary objects in certain cases as well. Word2Vec allows us to represent each object from a set of objects as a *dense vector of real numbers* in a way that preserves relations between different objects.

To get the intuition behind how Word2Vec works, we’ll look at its most common use case: embedding words as vectors. As such, those familiar with Word2Vec can skip the next section. From there we’ll see how Word2Vec can generalize to embed other objects. For this we’ll embed Reddit’s 10,000 most active communities. Finally, we’ll show how this embedding aligns with our understanding of what these communities represent.

## Word2Vec

The underlying intuition behind Word2Vec is that two words are similar if they are used in similar ways. For example if you substitute the word ‘good’ for the word ‘great’ in a sentence, it will likely still make sense. This concept is well summarized by the linguist John Rupert Firth who, in 1957, said “you shall know a word by the company it keeps.” While there are various implementations of Word2Vec, this article will focus on the Skip-gram model which fits in well with Firth’s ideas.

> ### “You shall know a word by the company it keeps.” — J.R. Firth

The Skip-gram model — when applied to words — **goes through each word in the text corpus and tries to predict the *n* words on either side of it.** The *n* words surrounding the target word are its context. In the picture below we see that the context for the word ‘nasty’ are ferocious, dog’s, sharp and bite.

![Word-Traget Relation](https://cdn-images-1.medium.com/max/2000/1*jg-Tx3IpkpkTy-bQeM5Z_w.png)

We start off by one-hot encoding each word, and then use a *shallow neural network* to predict all the context vectors associated with the target word. In this way, words used in similar contexts will have similar output vectors. By taking the output of the hidden layer, before converting the output into the concatenation of the one-hot encoded vectors, we can represent that word as a dense vector of real numbers.

![Word2Vec Skip-gram model](https://cdn-images-1.medium.com/max/2000/1*s__GyNO0aw2C_EFZie8keg.png)

Through this training process Word2Vec preserves semantic as well as syntactic shifts in language. For example the transformation from the vector representing the word ‘King’ (denoted by *[King]* ) to *[Queen]* is roughly the same as the transformation from *[Man]* to *[Woman].* Therefore we can represent the analogy *Man is to Woman as King is to Queen* as *[Man]-[Woman]=[King]-[Queen].* And if we didn’t already know that Queen is the final component of the analogy, we could solve for it using the equation *[Queen] = [King]-[Man]+[Woman].*

![Embedding Analogy Examples](https://cdn-images-1.medium.com/max/2800/1*wohQJmOwOmPR0v0eSv_5sA.png)

## Anything2Vec

The Skip-gram model has been well explored when applied to words, as seen through the popularity of Word2Vec, but its utility doesn’t stop at linguistic analogies. For this we’ll show how Word2Vec generalizes to situations where there’s a logical target-context relation.

### Subreddit Embeddings

Just as you can “know a word by the company it keeps,” the same logic applies to Reddit and its variety of online communities, called subreddits. The, less pithy, analog in this case is that we can know a subreddit by the commenters it keeps. For the Skip-gram model, each subreddit represents a “word” and that subreddit’s commenters act as the “context.” So like Word2Vec, subreddits with similar commenters will have similar output vectors.

![Subreddit Skip-gram model](https://cdn-images-1.medium.com/max/2000/1*lq_g8iPDNgpI_6M2vOGmyw.png)

While the output vectors are embedded in a high dimensional vector space (often 150+ dimensions), and thus can’t be visualized, [principal component analysis](https://stats.stackexchange.com/questions/2691/making-sense-of-principal-component-analysis-eigenvectors-eigenvalues) can return a 3-dimensional approximation. Below is a visualization of such an approximation for all 10,000 subreddits. In this plot we’ve highlighted the hip hop oriented subreddit, */r/hiphopheads,* and it’s 100 closest vectors. As we can see, the closest subreddits by cosine similarity are also hip hop themed.

![Subreddit embedding](https://cdn-images-1.medium.com/max/4034/1*RQd35n1X61pCJZOmRZibPg.png)

### Subreddit Analogies

With Word2Vec, the resulting embeddings can preserve relationships between words. This allows for simple vector addition and subtraction to answer analogy problems. For example, to answer the analogy *Berlin is to Germany as Ottawa is to x,* we calculate *[x]=[Germany]-[Berlin]+[Ottawa]* and choose the closest vector to *[x]* which would be *[Canada].* This property holds for our subreddit embedding as well. When posing the analogy */r/boston is to /r/chicago as /r/bostonceltics is to x,* the closest vector to *[/r/bostonceltics]-[/r/boston]+[/r/chicago]* is the subreddit dedicated to the Chicago Bulls.

![Vector transformation from a city to its corresponding NBA team.](https://cdn-images-1.medium.com/max/2000/1*XfmkMyd5FVJ5vxZGAla0og.png)*Vector transformation from a city to its corresponding NBA team.*

On a testing set of ~1,500 similar analogy problems (city to sports team, university to university town, state to state capital) our embedding attained 81% accuracy.

## When and When Not?

The core intuition behind Word2Vec, and its generalization, is that you can represent words, subreddits, Twitter users, *etc…* by the company they keep. Words used in similar contexts are likely similar; the same holds for  subreddits with similar commenters and Twitter users with similar followers. However, if there isn’t enough data, the embedding isn’t likely to pick up on the different dimensions in which the entities can be similar or different. Any user on Reddit likely comments on a variety of subreddits, not all of which are related. Yet, from a macro point of view, over millions of comments, very nuanced relations begin to emerge.

By first starting with a bare-bones approach to what an embedding can be, and then seeing how more nuanced embeddings can improve NLP problems — this article showed how embedding techniques can derive interesting results when applied to arbitrary objects, like subreddits. If you have thoughts on how you’d like to see this work used, feel free to let me know below!