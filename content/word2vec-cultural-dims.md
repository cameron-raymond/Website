---
title: "Understanding Word2Vec through Cultural Dimensions"
slug: "word2vec-cultural-dims"
emoji: "🧫"
blurb: "Understanding the decisions AI make is critical in mitigating its downsides. This article explains what cultural dimensions are, and demonstrates how they can increase interpretability and quantify bias in word embeddings."
tags: ["bp", "ml"]
link: "<a aria-label='Blog' href='https://medium.com/@cameronraymond/understanding-word2vec-through-cultural-dimensions-39934ae72926'>Blog</a>"
date: "2020-07-06"
prod: true
---
![Virus painting](https://cdn-images-1.medium.com/max/1600/1*Ix4p-_v0bbfu51vlacR36g.jpeg)*Photo by CDC on [Unsplash](https://unsplash.com/s/photos/virus?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)*

Word2Vec is a tool used to embed objects as vectors in a relationship preserving manner. It does so by following the intuition that words used in similar contexts likely have similar meanings. It was originally intended, as the name suggests, to embed words — but as my [previous article](https://cameronraymond.me/blog/anything2vec/) shows, it can be extended to represent any arbitrary set of objects that have a logical entity-context relation. And I’ll be the first to say that it is an incredibly clever and useful model.

Yet, it’s fair to ask: what do these vector representations mean? And how do we understand and make sense of the arbitrary dimensions that Word2Vec spits out? In this sense, my Petri dish emoji isn’t just a bad pun. Just as Petri dishes *culture* (awful, I know) bacteria, ML models grow and morph in often unexpected ways. Given this fact, and a newfound understanding of ML’s propensity to replicate existing biases¹, there has been a push for more transparent, interpretable AI. The thought process being that we need to understand why models behave the way they do to mitigate their discriminatory affects. In this article we’ll tackle embedding techniques, focusing on Word2Vec, and creating *cultural dimensions* that give a better understanding of what these models are quantifying.

## Interpretable AI

Word2Vec is a hugely popular tool in computational linguistics, NLP and is becoming more broadly used in other areas of ML. Yet, it suffers from a plague common in AI: a lack of interpretability. For example, say you use Word2Vec to model different sports as vectors. Word2Vec will spit out 150+ dimensional vectors that best preserve relationships between the different sports. Since the model has no prior knowledge of what sports are, it is unlikely that the dimensions in those vectors correspond to *the different cultural dimensions* that we take into account when perceiving the world. This is especially true when we reduce the embedding to 2 or 3 dimensions —  and is why when we visualize our embeddings, the *x-, y-* and *z-*axis don’t mean anything concrete. **With Word2Vec, each axis is just another way in which items can be similar or different, and there is no guarantee these dimensions will be meaningful in any other way.**

![Sport embedding visualized in three dimensions with “meaningless” x-, y-, and z-axes.](https://cdn-images-1.medium.com/max/3732/1*Lf7gD9Rclsrficmlkjg_qA.png)*Sport embedding visualized in three dimensions with “meaningless” x-, y-, and z-axes.*

This is in stark contrast to traditional feature engineering. Continuing with our sports example, say ESPN wanted to measure the perception of different sports. They could decide to measure each sport against a list of cultural dimensions. They may decide what they care most about is understanding how affluent, and how masculine each sport is perceived. They would then rank each sport, maybe through a survey, on its affluence and masculinity. This is still a form of embedding, since each sport is then represented as a vector of real numbers, but it is clear what the different axes mean. This is a much better starting point for analyzing gender or class disparities in sports.

![Two different ways of embedding sports as vectors.](https://cdn-images-1.medium.com/max/2000/1*MMKGiGLeuB0YXTRPkVm8QA.png)*Two different ways of embedding sports as vectors.*

While the latter is interpretable, it relies on fair and principled researchers, and is hard to scale to thousands or millions of objects. However, as Kozlowski et al. write about in their 2019 paper, *The geometry of culture: Analyzing the meanings of class through word embeddings*, we can have the best of both worlds. They define a technique that uses Word2Vec, and the scale it allows for, and then *reverse engineers cultural dimensions*, giving the interpretability of human driven feature engineering.²

## Finding Cultural Dimensions

One of Word2Vec’s properties is to position objects in some vector space in a way that preserves relationships between the objects. We can validate that these relationships are preserved by using the model to answer analogy problems. The canonical example of which being *man is to woman as king is to queen.*In vector form this means checking that the transformation *[man]-[woman]*³ is roughly the same as the transformation *[king]-[queen]*. If we wanted to quiz the model we would then see if *[king]+[woman]-[man]=[queen].*

![Word embedding analogy examples](https://cdn-images-1.medium.com/max/2800/0*rrtXS8euqoIpn4QX.png)

However these analogy problems can be viewed in a different light. Gender is the distinguishing factor in what defines a *king* relative to a *queen*, as well as a *men* from a *woman*. The transformation from one to another can then be thought of as a vector that points from the masculine in the direction of the feminine, which we could call a gender dimension. The gender dimension can then be defined as *[gender-dim]=[woman]-[man].* And as Kozlowski et al. point out: “adding *[woman]-[man]* to *[king]*has the effect of starting at *[king]*and taking one step on the gender dimension in the direction of femininity.”²

Similarly if our embedding, in this case a word embedding,  included words like *rich* and *bankrupt*. The transformation from *[bankrupt]* to *[rich]* can be thought of as pointing from the poor to the affluent, and thus we could define a class dimension as *[class-dim]=[rich]-[bankrupt].*Adding *[class-dim]* to another vector is equivalent to taking that vector and taking a step along the class dimension in the ‘affluence direction’.

### Using Cultural Dimensions

The vectors that transform *[king]* into *[queen]* or *[rich]* into *[bankrupt]* can be thought of as *cultural dimensions* that cut through the meaningless axes that Word2Vec provides. And since those cultural dimensions are just vectors themselves, they are easy to compare against new vectors.

![Projection of *[w] onto [v] by taking their dot product. Source: [3Blue1Brown](https://www.youtube.com/watch?v=LyGKycYT2v0&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=9).*](https://cdn-images-1.medium.com/max/2000/1*JFpl5nhVhFBUr2MHuhRiZQ.gif)*Projection of*[w] onto [v] by taking their dot product. Source: [3Blue1Brown](https://www.youtube.com/watch?v=LyGKycYT2v0&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&index=9).**

Going back to the sports example, **to see how masculine the vector representing *boxing* is — we can take the gender dimension, and project *[boxing]* onto it.**This is done by taking the dot product of *[boxing]* and *[gender-dim].*If the vectors in the embedding are normalized the dot product will range between [-1,1], where -1 indicates being exactly aligned with the masculine direction, and 1 indicates perfect alignment with the feminine direction. By projecting the sport vectors against both the gender and class dimensions, we can interpret each of those vectors in terms of gender and class.

![Projecting sports onto gender and class dimensions. Source: Kozlowski et al.](https://cdn-images-1.medium.com/max/3500/1*F6utNawJnIqfcUujo8HyOQ.png)*Projecting sports onto gender and class dimensions. Source: Kozlowski et al.*

Through this technique we not only have a way of saying if two sports are similar, but along what dimensions they’re similar. This brings us back to our original problem where traditional feature engineering, while interpretable, was prone to human bias and unable to scale. If ESPN decided gender and class were the only two dimensions they cared about — they could take their original, hard to interpret, embedding and translate it into dimensions that are much easier to understand.

![Representing the original Word2Vec embedding by its cultural dimensions.](https://cdn-images-1.medium.com/max/2000/1*OrlUEmBlY8u4bjZW1NlEjw.png)*Representing the original Word2Vec embedding by its cultural dimensions.*

## A Word of Warning

These techniques, while powerful, are by no means free from subjectivity or human bias. As with all machine learning, its results are a reflection of its training data and the design choices of those who built it. The researchers who build these cultural dimensions still have to initially define what it means for something to be masculine, feminine, affluent or working class.

Additionally, it’s important to note that Word2Vec and its resulting cultural dimensions aren’t tapping into some objective truth, but rather quantifying how objects are perceived in relation to each other. This means that techniques like Word2Vec can ingrain bias; the example of an embedding answering *homemaker* when posed  the analogy *man is to woman as computer programmer is to blank* comes to mind.³ While troubling and deserving of special acknowledgement, this fact about AI actually poses a unique opportunity. Word2Vec’s cultural dimensions can be a powerful tool for exploring and quantifying bias exists in our everyday world. From this point of view it can act as an AI bias barometer: uncovering discrimination in hiring techniques, school curricula and literature.

For more information on Word2Vec, interpretable AI and algorithmic bias I would highly recommend checking out the papers below. For more information on myself or my research, check out [cameronraymond.me](https://cameronraymond.me/).

[1]Bolukbasi, Tolga, Kai-Wei Chang, James Y. Zou, Venkatesh Saligrama, and Adam T. Kalai. “Man is to computer programmer as woman is to homemaker? debiasing word embeddings.” In *Advances in neural information processing systems*, pp. 4349–4357. 2016.

[2] Kozlowski, Austin C., Matt Taddy, and James A. Evans. “The geometry of culture: Analyzing the meanings of class through word embeddings.” *American Sociological Review* 84, no. 5 (2019): 905–949.

[3] If we have an object in our embedding *x* the vector for *x* is denoted as *[x].*
