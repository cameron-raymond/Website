---
title: "RL for Traffic Flow"
slug: "rl-for-traffic-flow"
emoji: "🚙"
blurb: "Helped develop a reinforcement learning agent that helps control the flow of traffic. Through a simple RL algorithm, we were able to reduce carbon emissions by a third, and cut time waiting at red lights in half."
tags: ["rl"]
link: "<a aria-label='Repo' href='https://github.com/ZaneLittle/Traffic-Light-Simulation#q-learning-for-traffic-signal-control'>Repo</a>"
date: "2019-12-01"
---

* **Cameron Raymond** - *Computer Science, Queen's University*
* **Hugh Corley** - *Applied Mathematics, Queen's University*
* **Leonard Zhao** - *Biomedical Computing, Queen's University*
* **Nicolas Wlodek** - *Cognitive Computing, Queen's University*
* **Ross Hill** - *Software Design, Queen's University*
* **Zane Little** - *Cognitive Computing, Queen's University*

** **

## Q-Learning for Traffic Signal Control

![Gif broke!](https://media.giphy.com/media/ZDF8gHKyt5nQzwtwSU/giphy.gif)

### Performance Over Time

#### Loop Route

![Loop Softmax Over Time](https://raw.githubusercontent.com/ZaneLittle/Traffic-Light-Simulation/master/images/DailyAverage-LoopRoute-Softmax.png)

#### Normal Route

![Normal Route Over Time](https://raw.githubusercontent.com/ZaneLittle/Traffic-Light-Simulation/master/images/DailyAvg_NormalRoute_%20EGreedy.png)

## Dependencies

* `pip3 install -r requirements.txt`

## Config Values That You Can Customize

1) Set the file that you'd like to save the Q-Table to in config.
2) Set the Q-Table to load from (if you want to train from scratch you'll have the option to from command line).
3) Set the number of years and day per years (default is 1 year of 10 days).
4) Set the policy that you'd like to use (`egreedy` or `softmax`)
5) Set the environment dynamics in the config with `ENV_CONSTANTS["ROUTE"]` (either `normal`, `loopy` or `simpleLoopy`)

## To Run

* **Train/Plot** -  `python3 Main.py`
* **Visualize** - `python3 Visualizer.py` (this will also train but much slower due to as it has to render each new state)
