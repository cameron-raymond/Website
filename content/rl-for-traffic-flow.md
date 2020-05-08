---
title: "Reinforcement Learning for Traffic Flow"
slug: "rl-for-traffic-flow"
emoji: "🚙"
blurb: "A reinforcement learning agent that helps control the flow of traffic. Through this simple RL algorithm, we were able to reduce carbon emissions by a third, and cut time waiting at red lights in half."
tags: ["rl"]
link: "<a aria-label='Repo' href='https://github.com/ZaneLittle/Traffic-Light-Simulation##q-learning-for-traffic-signal-control'>Repo</a>"
date: "2019-12-01"
---

## Introduction

### Motivation

![alt_text](content/rl-for-traffic-flow/showcase.gif "Figure 1: Illustration of a road network with overlay of the queues modelled at each intersection")
*Figure 1: Trained RL agent coordinating rush hour traffic.*

Before undertaking this project, we had several ideas of what problem to undertake, including solving games such as Snake or Space Invaders. However, many traditional games have already been solved using reinforcement learning methods. While this project takes inspiration from previous studies on using reinforcement learning techniques for traffic light control, the exact nature of the environment (which we have created from scratch) can be easily changed and thus present an entirely new problem. Additionally, although problems such as Snake are interesting, they have no real-world applications other than entertainment. Conversely, traffic light control systems have immense importance in the real-world; poorly designed systems impact commute times and increase carbon emissions due to congestion.

### Relevance

Our project involves optimizing traffic light controls. This is a real-life problem that is especially pertinent in congested cities. Inefficient traffic control systems are costly in many ways. While people and their vehicles are being stuck in traffic, their time is being wasted (usually at crucial times of the day, such as rush-hour), expensive fuel is being consumed, and harmful greenhouse gases are emitted. Great lengths have been taken to mitigate some of these effects (for example, auto stop-start systems have been a recent development); however, there is much work to be done. One obvious approach to reduce traffic congestion in the first place is by designing more efficient traffic control systems.

Throughout this project we have attempted to design a reinforcement learning agent which controls traffic lights in a simulated environment. The goal is to minimize the expected wait time for cars within the environment, which is composed of four different intersections, each of which controls traffic using traffic lights.

## Problem Formulation

### Environment

![alt_text](content/rl-for-traffic-flow/traffic-setup.png "Figure 1: Illustration of a road network with overlay of the queues modelled at each intersection")
*Figure 2: Illustration of a road network with overlay of the queues modeled at each intersection*

The objective we want to optimize is minimizing the average wait time of cars. Thus, we want a policy for switching traffic light controls that will ensure a consistent and smooth transition of cars from one intersection to the next.

We attempt to model a road network such as _Figure 2_. In order to reflect this, we developed our own environment in simulation. It consists of four intersections, each with a traffic light entity that controls traffic at that intersection, along with 4 queues at each intersection that represent all the cars that are waiting to go through.

Cars are randomly added to one of the queues on the “outside” of the network (such as the southern facing queue of the north-west traffic light). As time progresses, cars drive a randomized, predetermined route through the network, and out an exit node on the outside of the network. These optimal routes are determined, given a start and end node, by performing a breadth-first search. All cars in the same queue can be thought of as facing the same direction, though they don’t necessarily need to be heading the same way. If the light at the queue a car is in is green, they are popped from this queue and pushed to an adjacent queue, depending on the route they intend to take.

We discretize episode time-steps by considering each step as the time it takes a single car to move through the intersection. Thus, at each time step, every traffic light can change its lights, and up to one car from each queue can move through the intersection to either the next queue or to its exit location. We also consider some rules in our environment for simplification: cars can’t make left or right turns when they are facing a red light; cars take two time steps to move from one queue to another (this way cars are not “waiting” in the next queue until two time steps later) so as to simulate the time it would take to drive from one light to another; and cars are always able to make left turns when facing green lights.

To better simulate real-life traffic, we implement high-traffic and low-traffic times to recreate “rush-hour” traffic. The difference is that during high-traffic times, more cars are being generated into the environment at each time step. Furthermore, we split the time steps into days (with 600 time steps per day) and years. The environment is reset at the end of each day, meaning that all cars still in the environment are removed. During each day, we have two high-traffic periods to simulate the standard two rush hours per day.

### State space

Each intersection is controlled by a traffic light entity that has two states: allowing north-south traffic (light is green for cars north and south of the light and red for cars east and west of the light) or allowing east-west traffic. Since we are trying to minimize waiting times for cars, we also need to include waiting times into our state space. As it would be unrealistic to account for a continuous measure of wait times for every car, we instead discretize this for each queue of cars. The amount of time each car has been waiting in the north and south queues of a particular intersection is summed. This value is binned as a zero, low, medium, or high waiting time for the pair of queues. The same is done for the east and west queues for each intersection.

Thus we have a state space with a maximum of: 2<sup>lights</sup> ⋅ 4<sup>2⋅lights</sup> = 2<sup>4</sup> ⋅ 4<sup>8</sup> = 1,048,576 states.

### Action space

Each light can enable north-south traffic or east-west traffic. This means that there are two actions available for each light at each step: switch light directions (turn green lights to red or turn red lights to green) or do nothing. Thus, the total action space is 2<sup>4</sup> = 16 possible actions.

### Reward scheme

As the objective is to minimize average waiting times, in order to maximize the reward we give a negative value for wait times. For each queue, we obtain the sum of the wait times for all the cars in the queue, and this is categorized as one of four bins. There is a bin for zero wait time, which results in zero cost. The next lowest bin (“low total wait time”) gives a small negative reward (low cost) and the highest bin (“high total wait time”) gives the large negative reward (most cost). A light “queue” that either has no cars in it, or is green in that direction, does not contribute to the reward.

## Solution Overview

### Approach

We used Q-learning for training the agent. The Q-table is represented as a dictionary with the state value being the key, and its value being the A(s). By using a dictionary (a hash table) instead of an array, we were able to avoid storing entries until they were visited. This reduced memory usage as, in-practice, only 8-12% of the state space needed to be explored before convergence. We use a learning rate, _α_, of 0.9; a discount factor, _γ_, of 0.5; and an exploration rate, _ε_ of 0.01. Additionally, we implemented a softmax policy to compare against the _ε_-greedy policy. We decided to use Q-learning as we have a very large state space so bootstrapping would be preferable to keep training times reasonable.

### Environment

No external environment, simulation or data sets were used. The agent was trained exclusively on the aforementioned environment we created.

## Results

### Comparison of softmax and _ε_-greedy for a normal and loop route

We first compared the performance of using an _ε_-greedy and a softmax policy with our “normal” route generation, or simply optimal routes with randomized start and end points. We can see from Figure 2 and Figure 3 that both models have similar performances, though the _ε_-greedy model converged to a slightly lower average wait time.

![alt_text](content/rl-for-traffic-flow/DailyAvg_NormalRoute_Softmax.png "Figure 2: Softmax daily averages for normal route.")
*Figure 3: Softmax daily averages for normal route.*

![alt_text](content/rl-for-traffic-flow/DailyAvg_NormalRoute_EGreedy.png "Figure 3: ε-greedy daily averages for normal route.")
*Figure 4: ε-greedy daily averages for normal route.*

We then compared the two policies using a “loop” route, where every car performs 10 counter clockwise loops and then exits.


![alt_text](content/rl-for-traffic-flow/DailyAvg_LoopRoute_Softmax.png "Figure 4: Softmax daily averages for looping route.")
*Figure 5: Softmax daily averages for looping route.*

![alt_text](content/rl-for-traffic-flow/DailyAvg_LoopRoute_EGreedy.png "Figure 5: ε-greedy daily averages for looping route.")
*Figure 6: ε-greedy daily averages for looping route.*

From Figure 4 and Figure 5 above, we can see that using a softmax policy on the loop route enabled the agent to learn the loop. Comparing this to Figure 5, the _ε_-greedy agent converges but has some difficulty as time goes on. Due to the difference in performance between the two policies when using “random” routes and looped routes, the choice of which policy to use would depend on how the cars behave in the environment.

The trained agent is able to efficiently control traffic in a robust manner. Despite having a great variation in the number of cars added to the environment (for example, during rush hour), the time cost per car stays relatively constant, as shown in Figure 6 below.

![alt_text](content/rl-for-traffic-flow/OneDay_NormalRoute_EGreedy.png "Figure 6: Cost per car throughout a day. Note the two periods of rush hour in the lower plot.")
*Figure 7: Cost per car throughout a day. Note the two periods of rush hour in the lower plot.*

In addition to modeling the movement of vehicles throughout the environment, the amount of carbon dioxide produced by each vehicle was also simulated. As is expected, utilization of the learning agent resulted not only in more efficient traffic control, but also resulted in less carbon dioxide being produced each day. The results of certain routes (either normal or loop) and policy being used (either softmax or _ε_-greedy) are similar to that of the results for the wait times discussed previously, with softmax performing better for the loop route, and _ε_-greedy performing better for the normal route.

![alt_text](content/rl-for-traffic-flow/CO2_NormalRoute_Softmax.png "Figure 7: Cumulative CO2 for normal route using softmax.")
*Figure 8: Cumulative CO2 for normal route using softmax.*

![alt_text](content/rl-for-traffic-flow/CO2_NormalRoute_EGreedy.png "Figure 8: Cumulative CO2 for normal route using ε-greedy.")
*Figure 9: Cumulative CO2 for normal route using ε-greedy.*

![alt_text](content/rl-for-traffic-flow/CO2_LoopRoute_Softmax.png "Figure 9: Cumulative CO2 for loop route using softmax.")
*Figure 10: Cumulative CO2 for loop route using softmax.*

![alt_text](content/rl-for-traffic-flow/CO2_LoopRoute_EGreedy.png "Figure 10: Cumulative CO2 for loop route using ε-greedy.")
*Figure 11: Cumulative CO2 for loop route using ε-greedy.*

## Conclusion

A number of adjustments to our solution had to be made during the development of our agent in order to achieve desirable results. Reducing the state space of the problem is key in decreasing training time. Initially, our approach involved including the current time of the simulation in the state, so that the agent would be able to learn about when rush-hour occurs and adjust its strategy accordingly. Ultimately we learned that including time in our state greatly increases the size of the state space, and that the agent “learns” how to handle rush hour through the information embedded in the queues - their wait times. Therefore, this extraneous piece of information was not necessary.

We learned that, given problems with different parameters, soft-max or e-greedy can be the better approach, and the developer has to apply a different strategy based on the circumstances. Experimenting with these policies revealed how using different parameters would change our results and potentially improve our model for specific situations.

We also learned that decreasing the size of the state-space doesn’t necessarily provide a performance gain; by adding a bin for zero wait time, the agent was able to differentiate between queues with _few_ cars and queues with _no_ cars, decreasing travel times.

Finally, working on a problem tied to a real-life application helps us see how reinforcement learning can be applied to improve real-world systems. Over the course of a 140 day run, our system was able to reduce carbon emissions by approximately 2000 kg over a naive agent for a car with a deterministic route. Our solution can be extended very easily to the real-world not only to reduce our carbon footprint, but also to save travel time for the everyday driver.
