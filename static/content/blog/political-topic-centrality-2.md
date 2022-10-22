---
title: "Analyzing Political Polarization: Topic Modelling"
slug: "political-topic-centrality-2"
emoji: "🏛"
blurb: "Part two of three in a series that analyzes political polarization through network science. Modelling and extracting topics from political tweets. Posted on the popular blog Towards Data Science."
type: "bp"
tags: ["nlp"]
link: "<a aria-label='Blog' href='https://medium.com/@cameronraymond/analyzing-political-polarization-topic-modelling-2-b45a7bd3d3cc'>Blog</a>"
date: "05-21-2020"
prod: true
---

**NOTE: this was my first uninhibited, and unsupervised, exploration into computational social science. While I learned a lot from this project, it's clear that the methods and findings are not well-founded. It was, however, lots of fun! I'm leaving these posts up for posterity but, again, would not consider it close to rigorous.**

![Source: [Salesforce.com](https://www.salesforce.com/ca/blog/2019/10/get-to-know-ai-for-business--natural-language-processing.html)](https://cdn-images-1.medium.com/max/2402/1*8wo8S9TmNx7aMHWSW_lSfg.png)*Source: [Salesforce.com](https://www.salesforce.com/ca/blog/2019/10/get-to-know-ai-for-business--natural-language-processing.html)*

Networks can tell us a lot about the world we live in. As Duncan Watts, a UPenn sociologist, famously said: "Networks are important because if we don’t understand networks, we can’t understand how markets function, organizations solve problems or how societies change." However, if we’re exploring relationships between different **things** through networks, we need to understand **what exactly those things are.** That is what we’ll be looking at in this article: what can we say about the tweets leading up to the Canadian 2019 election that can help our network analysis of political polarization?

[Previously](https://towardsdatascience.com/analyzing-political-polarization-on-twitter-engagement-graphs-aa0614ed1361), I laid out the foundation for this analysis. I argued that political polarization is important to study, but is a broad and vague term — so a more concrete task is to formalize/quantify the different forms that political tweets can take. I argued that there are two broad types of political messages that are relevant to political polarization: *bridging messages*, that attract engagement from new, untapped demographics — and *bonding messages*, which rally a political party’s voter base. And I introduced engagement graphs, which are networks that frame the tweets of political parties as brokers between the party leaders and the broader electorate. However, to understand how different political messages affected the election, we have to know what types of topics the party leaders tweeted about!

![](https://cdn-images-1.medium.com/max/5894/1*q8LjOscOt3U-PXajSNqusA.png)

This article, then, is about the tweets scraped from the Twitter accounts of the five party leaders we’re looking at: Andrew Scheer, Elizabeth May, Jagmeet Singh, Justin Trudeau, and Maxime Bernier. We’ll look at how to clean Twitter data, how to model it, and by the end we’ll be able to take each tweet in our engagement graph and assign it a topic.

## The Data

This new data set was collected with Twitter’s historical search API, which allows user’s to programmatically access any publicly available tweet. The API was used to collect all of the English tweets from Canada’s five, English speaking party leaders: Andrew Scheer, Elizabeth May, Jagmeet Singh, Justin Trudeau, and Maxime Bernier. All of these party leaders’ tweets between October 21, 2018 and October 21, 2019 — Canada’s 43 general election — were collected. While the tweets from each Federal party’s official Twitter accounts were also collected, they acted as logistical tools — informing party affiliates of events and rallies. The personal accounts for party leaders better represent their beliefs, platforms and style of rhetoric, and are better suited to analyze the bridging versus bonding nature of different topics. In this spirit, only tweets of the party leader were used, excluding retweets. Below graphs the daily and cumulative number of tweets over time, in aggregate and by party leader, for a total of **7,978** tweets.

![Party leader tweets over time.](https://cdn-images-1.medium.com/max/2160/1*9Z7d9R6f0bV8WoaHlS7BWw.png)*Party leader tweets over time.*

Additionally, for each tweet collected from a party leader, all of the available retweets by general users were collected for a total of **113,293 retweets** by **36,450 general users**. This is, again, visualized in aggregate and by party leader below.

![Retweets for each party leader over time.](https://cdn-images-1.medium.com/max/2160/1*pYkiqRx8Xso0uxkObA0bAw.png)*Retweets for each party leader over time.*

## What is Topic Modelling?

In order to evaluate the bridging and bonding characteristics of political messages on Twitter, the tweets we collected need to be organized by topic. Given that there are thousands of tweets, going through each individual one and assigning it some topic isn’t feasible or applicable to other contexts. As a result, we need techniques that autonomously organize big, unclassified bodies of text.

Topic modelling is a form of unsupervised machine learning (ML) that can find clusters of words that frequently occur together (topics), connect words with similar meanings, and can distinguish different uses of words with multiple meanings¹. This is based on the assumption that a document, in this case a tweet, is about a finite number of things². By training a topic model on our collection of tweets, we will be able to see what words frequently occurred together, which will act as our topics.

### Data Cleaning

Given the inherent noise and extraneous info in text data, it is standard and necessary to preprocess text before modeling¹. Since we’re only interested in what a tweet is about, we can safely remove punctuation marks; words like ‘and’, ‘or’, ‘the’, etc.; words with fewer than three characters; and URLs. Other common Twitter symbols like ‘RT:’, ‘@’ and ‘#’ can also be removed. Emojis contain valuable information, but are hard for a computer to interpret, so they were converted to text using the Python package emoji. After this process, all text was converted to lower-case and lemmatized to get rid of common suffixes. This means that the tweet below, after preprocessing, reads: *wherever maple leaf fly represents rich history bright future value hold dear happy flag day canada*.

![Example tweet](https://cdn-images-1.medium.com/max/2000/1*huOCrc67kdG9zn6QgMktVA.png)*Example tweet*

### Latent Dirichlet Allocation

My original paper, which can be found on my [personal website](https://cameronraymond.me/), goes into depth on what a latent Dirichlet allocation (LDA) is. But I think it’s important to not get too bogged down in other academics’ (brilliant) work and distract from what we’re trying to achieve: _a knowledge of the main topics Canadian party leaders tweeted about in the lead up to the 2019 election._ So for this section I will stay at a pretty high level. An LDA is a topic model that defines two probability distributions— one which models topics as “a distribution over a fixed vocabulary of terms,” and another which models documents as a distribution of topics². The LDA requires four inputs: the body of text — which in this context are the cleaned tweets from all five party leaders; α — which acts as a concentration parameter for how documents are modeled as topics; β — which acts as a concentration parameter for how topics are modeled as words; and *k*— which is the number of topics to be modeled². By concentration parameter I mean that when α is small, a tweet is more likely to be considered an even mix of the *k* topics; conversely when α is larger a tweet is more likely to be considered ‘about’ fewer topics. By training an LDA on all ~8,000 cleaned tweets, we will be able to *model each tweet as some distribution of topics*. In doing so, we’ll be able to plug those tweet topics into our engagement graph to see who tweeted about what, and how those tweets were viewed by the voting public.

## Results

By performing a parameter sweep we saw that the most performant LDA had a *k* value of 7, α of 0.31 and β of 0.81. Each of the party leaders’ tweets was then represented as some combination of the 7 latent topics that were extracted. By labeling each tweet as the maximum probability value in its topic distribution, each tweet was given a single topic! I found the best way to visualize what each topic is about is to create word clouds, which I’ve included below.

![LDA word clouds](https://cdn-images-1.medium.com/max/2088/1*OncxG28xAWVokOOY3cyJYA.png)*LDA word clouds*

Topic 1 pertained to **campaign messages, rallies and logistics** — and makes up 8.2% of all tweets. Topic 2 contains tweets regarding a **carbon tax, pipelines and the economy** — and makes up 16.3% of all tweets. Topic 3 contains tweets about the **SNC Lavalin affair**, a scandal that plagued Justin Trudeau, and tweets about corruption — making up 18% of all tweets. Topic 4 is predominantly **appeals to the middle-class and economy** — and is 29.7% of all tweets. Topic 5 contains **celebratory messages** about the campaign, as well as tweets regarding national holidays and days of remembrance — and make up 15% of all tweets. Topic 6 is made up of tweets about **immigration, diversity and free speech** — and makes up 11.5% of all tweets. Finally, topic 7 contains tweets regarding **healthcare, abortion and pharmacare**— and makes up 1% of all tweets.

![Tweets by topic breakdown](https://cdn-images-1.medium.com/max/2702/1*mYH2M6Zmh5Sa60T5xGHbAw.png)*Tweets by topic breakdown*

This is already a rich source of information. By doing this topic modelling we can see that while topic 6, tweets pertaining to diversity and immigration, only made up 11.5% of all tweets they *made up the majority of Maxime Bernier’s*. Additionally, Andrew Scheer and Elizabeth May’s campaigns relied heavily on topic 3, the SNC Lavalin affair, with a disproportionate number of tweets aimed at Justin Trudeau’s handling of the scandal. It’s also clear that the more right-leaning candidates, Maxime Bernier and Andrew Scheer, had a disproportionate number of tweets pertaining to topic 2. These were tweets rebutting Justin Trudeau’s plan to implement a carbon tax, and arguing for greater access to Alberta’s Oil Sands. Now that we know what these topics are about, we can update the engagement graph from before. Now each tweet vertex is colored according to its topic. The topics have the same color as the pie chart above for reference.

![Engagement graph with tweet vertices colored by topic.](https://cdn-images-1.medium.com/max/6000/1*dlDjeRQMuZoexm-onCcAuw.png)*Engagement graph with tweet vertices colored by topic.*

## What’s Next?

Descriptive measures show the frequency that tweets of different topics were promoted by Canadian party leaders leading up to a major election. This article shows how this can be done in an autonomous way, letting topics emanate from the tweets collected. However, knowing that Maxime Bernier tweeted an absurd amount about immigration says little about how different policies rallied groups of existing supporters, or bridged different voting blocs. That is what we’ll cover in the final installment of this series when we look at the concept of *vertex centrality.* I view these first two articles as somewhat disjoint, the first spent the whole time talking about the importance of networks, and then we barely mention them here. Next week will reconcile the two, and show how topic modelling is a key stepping-stone that gives real depth to the engagement graph — and allows us to see which of these 7 topics bonded voting groups, and which bridged them.

[1]: Alghamdi, Rubayyi, & Alfalqi, Khalid. (2015). A survey of topic modeling in text mining. *Int. j. adv. comput. sci. appl.(ijacsa)*, 6(1).

[2]: Blei, David M, Ng, Andrew Y, & Jordan, Michael I. (2003). Latent dirichlet allocation. *Journal of machine learning research*, 3(Jan), 993–1022.

[3]: Sapul, Ma Shiela C, Aung, Than Htike, & Jiamthapthaksin, Rachsuda. (2017). Trending topic discovery of twitter tweets using clustering and topic modeling algorithms. *Pages 1–6 of: 2017 14th international joint conference on computer science and software engineering (jcsse)*. IEEE.
