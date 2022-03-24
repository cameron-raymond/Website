---
title: "Simulating Statistical Power in R"
slug: "power-simulations-in-r"
emoji: "🔋"
blurb: "A tutorial (with code!) explaining the important concept underpinning the design of vaccine trials, the validity of A/B tests, and driving the “reproducibility crisis” in the social sciences."
type: "bp"
tags: ["ci"]
collaborators: ["RegLab"]
link: "<a aria-label='Blog' href='https://medium.com/@cameronraymond/simulating-statistical-power-in-r-9eba698625e7'>Blog</a>"
date: "2022-03-24"
prod: true
---

![Photo by [Jordan Rowland](https://unsplash.com/@yakimadesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/two-coins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/12000/1*Flo-5pgled3gYcDON9kx4g.jpeg)*Photo by [Jordan Rowland](https://unsplash.com/@yakimadesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/two-coins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

Imagine you have two coins: coin A is fair and coin B will come up heads 90% of the time. If you were asked to figure out which coin is fair and which is biased you would probably flip both coins and record how often each came up heads. If you do this enough times it would become clear that coin B is biased. *But how many times should you flip each coin?* That is, how big of a sample of coin tosses do you need to correctly figure out which coin is biased?

Even if coin B almost always comes up heads, you will sometimes flip tails. So in any given sample, you may simply get unlucky and coin B *will look fair* even though it isn’t. This is unlikely to be the case if you flip each coin a large number of times, but that takes effort, and you can never guarantee that you didn’t get unlucky, so the question is: how comfortable are you with being wrong? What if coin B only comes up heads 60% of the time? Intuitively it seems like you would need a bigger sample, since the coins are more similar now, but how much bigger?

These are all questions about **statistical power.** In layman’s terms, power is your ability to detect effects. In less layman-y terms, power is the probability of identifying an effect, conditional on one being present. Power underpins the design of vaccine trials, A/B tests, and is a driver of the “reproducibility crisis” in the social sciences. Ensuring that you have sufficient power means that you can be more certain of what your statistics are telling you. Being underpowered means that any effects you find are the result of chance, and any effects you don’t find could just be because you don’t have enough data*.

## What is Power?

Statistical power is the probability of identifying an effect, conditional on one being present. Power is generally a function of your posited effect size, the variability among your observations, your sample size, your confidence threshold. For a decent overview, see: [Cohen’s Power Primer (1992)](https://www2.psych.ubc.ca/~schaller/528Readings/Cohen1992.pdf).

![Photo by [Raphael Renter](https://unsplash.com/@raphi_rawr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/power?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/5334/1*ZJ8n6AVW2xoqoJ3EZIIHpw.jpeg)*Photo by [Raphael Renter](https://unsplash.com/@raphi_rawr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/power?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

In the coin example, the effect size is the difference between how often coin A comes up heads and coin B comes up heads; larger effects are easier to detect. In the coin example you are told how biased coin B is, but in the real world you have to make a reasonable guesses about effect sizes. The sample size is how many coin flips you do; larger samples are less likely to be “unlucky” and as a result also increase power. Your confidence threshold is your tolerance for saying that there *is an effect* when there may actually not be.

Power analyses are most often used to determine: a) how big of a sample you need for your analysis, and b) what is the minimum effect size that you are able to detect. This is done by holding the other factors constant, and increasing/decreasing the variable of interest (sample size or effect size) until you hit a power threshold. Generally researchers select the arbitrary power threshold of 0.80, meaning that you have a power of 80% and are able to detect true effects of that magnitude, with that sample size, 80% of the time.

## Simulating Power

While there exist standard equations and [software](https://homepage.stat.uiowa.edu/~rlenth/Power/) for calculating power, there are many situations in which they may not be applicable (e.g. when using randomization inference, mixed-effects models, etc.. See: Arnold et al., 2011). An alternative is to work with simulations. Simulations can be run for all possible designs and are more robust. They also increase ecological validity since you, in theory, can take the exact same method of analysis (even the same R code), and apply it to your actual data. Finally, simulations force you to be explicit with your assumptions about the data generating process.

In the coin example, a single run of your power simulation would involve simulating a set number of coin tosses, comparing the rate of heads for coin A and coin B, running a statistical test to determine if coin A != coin B, and recording the result. You would repeat this a large number of times and calculate the percentage of times you correctly said that coin B is biased: this is your power estimate.

While R packages like SIMR exist for running power simulations, I find that they can be overly restrictive. This article will outline how I have organized my power simulations with minimal dependencies. While the coin example is useful, these simulations consider how many participants are needed for a randomized experiment meant to increase attendance rates across 4 schools.

```r
library(tidyverse)
library(patchwork)
library(stargazer)
library(scales)
library(broom)
```

## Simulation Structure

I organize my simulations to have 3 important functions:

1. **The data generator**: Creates samples of data based on your model of the world.

1. **The estimator**: Takes in samples and returns models that include an effect estimate (what is the difference between the two coins?)

1. **The discriminator**: Takes in the model and determines whether that effect is credible (*i.e.* statistically significant).

These are all used in your organizing power simulation function, which will call all three functions repeatedly and returns the proportion of runs where your discriminator correctly found an effect.

### The Data Generator

Your data generator codifies all the assumptions you are making about how your experiment would work in the real world. Often this will include assumptions about the independence of your observations, constant treatment effects, common support, unconfoundedness, etc… However, when simulating your power analysis you are able to adapt these as necessary. Given that the two questions of interest with power analyses are about the minimum sample size *or* minimum detectable effect size, I include those as parameters. Each time you call the data generator function, it will create a completely new sample of data with the exact same properties.

```r
data_gen_func <- function(effect_size,sample_size) {
  data <- tibble(
      # 4 Different schools
      School = sample(0:3,sample_size,replace=TRUE),
      # W = treatment indicator
      W = sample(0:1,sample_size,replace=TRUE)) %>%
    mutate(
      # Avg days attended of 30, they get an effect size boost if they are
      Days_Attended = 30 + effect_size*W  -3*School + rnorm(sample_size, mean = 0, sd = 10),
      School = paste("School",School) %>% as.factor(),
      W = as.factor(W)) %>%
    return()
}
# EXAMPLE RUN
# 5 day effect size (treatment increases attendance by 5 days) 50 students enrolled in study
small_n <- data_gen_func(5,50) %>%
  custom_chart() +
  labs(title="Small Sample",y="Avg. School Days Attended",x="",fill="Treated")
# 5 day effect size (treatment increases attendance by 5 days) 5000 students enrolled in study
big_n <- data_gen_func(5,5000) %>%
  custom_chart()  +
  labs(title="Big Sample",y="",x="",fill="Treated")
 
small_n + big_n + plot_layout(guides = "collect")
```

In this example, each row represents a student from one of 4 different schools; we also have the number of days that student was in attendance that semester. W represents the treatment indicator which we are assuming gives a 5-day boost in attendance. We are also assuming that different schools have different baseline attendance rates and that there is some random noise at the individual level.

![Samples from the data generator modelling the effect of an intervention across four schools on attendance rates. Left plot has sample size of 50; right plot has sample size of 5000. Both model the same 5-day effect size.](https://cdn-images-1.medium.com/max/2000/1*yxFumX0QEj7WPDzpjUX0vQ.png)*Samples from the data generator modelling the effect of an intervention across four schools on attendance rates. Left plot has sample size of 50; right plot has sample size of 5000. Both model the same 5-day effect size.*

As can be seen when running our data generator function with the same effect size (5 extra days attended) but different sample sizes, we get a much different picture. Importantly, the small sample run (left, $n=50$)  is much noisier than the large sample (right, $n=5000$).

### The Estimator

Your estimator takes in a sample of data, and tries to recover its properties that you are interested in. Importantly it returns some sort of *model* that allows you to summarize the data generating process. In the coin example, the property of interest would be how frequently coin A comes up heads compared to coin B. In our school example, the property of interest is the number of days attended in the treatment group compared to the control, after controlling for other factors. **Ideally, your estimator function should perform the same analysis that you would want to perform on your actual data.** It’s important to note that the estimator used will also affect statistical power, as some estimators are less efficient than others.

```r
analysis_formula <- 'Days_Attended ~ W + School'
estimator_func <-  function(data) lm(as.formula(analysis_formula), data = data)
# EXAMPLE RUN
small_n <- data_gen_func(5,50) %>%
    estimator_func()
big_n <- data_gen_func(5,5000) %>%
    estimator_func()
stargazer(small_n,big_n,align=TRUE,type="text",column.labels = c("Small Sample (n=50)", "Large Sample (n=5000)"))
```

In this example we use a linear regression that includes the treatment indicator, W, as well as the school indicator as a control. With the small sample size (left), the model gives imprecise estimates with large standard errors. The larger sample size is able to confidently recover the parameters we encoded in our data generating function, including the treatment effect and the difference in baseline attendance rates by school.

![Results from our estimator function for two samples of our data generator. Note how the parameter estimates on the right have much smaller standard errors and are extremely close to the true values encoded in our data generator.](https://cdn-images-1.medium.com/max/2472/1*IciThuzElPy5XfY-W6cxjQ.png)*Results from our estimator function for two samples of our data generator. Note how the parameter estimates on the right have much smaller standard errors and are extremely close to the true values encoded in our data generator.*

### The Discriminator

The discriminator takes in your model as an input and gives an answer to your original question, given that sample of data and method of analysis. In our coin example this would be evaluating the difference between coin A and B. In our school example, this is determining whether the treatment indicator’s coefficient is statistically significant at our set confidence threshold. That is, checking if the *p*value for the treatment indicator is below 0.05.

As can be seen below, we are able to say that our treatment had a statistically significant effect on attendance rates when using a large sample but we are not able to with the small sample. Note however, that if we were to run this code block again we may get a different result (since we’d be working with a new sample of data).

```r
alpha <- 0.05
discriminator_func <- function(model) tidy(model)$p.value[2] <= alpha
# EXAMPLE RUN
small_n <- data_gen_func(5,50) %>%
    estimator_func() %>%
    discriminator_func()
big_n <- data_gen_func(5,5000) %>%
    estimator_func() %>%
    discriminator_func()
paste("Able to detect effect with small sample size?",small_n)
# Returned: 'Able to detect effect with small sample size? FALSE'
paste("Able to detect effect with large sample size?",big_n)
# Returned: 'Able to detect effect with large sample size? TRUE'
```

While this is trivial for this example, there are cases in which you would need a more complex discriminator. For example, if the treatment assignment in our school trial wasn’t at the individual level, but at the school level, then you may want to cluster your standard errors at the school level (Abadie et al., 2017). Or, if your study encompasses the entire population and you are working within a [design-based inference framework](https://economics.mit.edu/files/13161), you may want to use randomization inference to determine statistical significance (Abadie et al., 2020). By using power simulations you are able to swap these different methods in-and-out as needed.

## Putting it all together

Once you have defined your data generator, your estimator and your discriminator, you can run the full power simulation. This function takes in your three functions as input as well as some simulation parameters (*i.e.* how many runs in the simulation do you want?). For each run in the simulation you generate a new sample of data, pass it through your estimator, and record whether your discriminator was able to determine an effect. At the end, the power simulation returns the proportion of times that you correctly identified an effect. This is an approximation of your statistical power.

Since you often want to vary the effect size/sample size in your data generator, I pass a parameterized (*i.e.* a function that returns the function with set parameters) version of the data generator.

```r
calc_power <- function(data_generator,estimator,discriminator,num_sims=500) {
  sig_results <- c()
  for (i in 1:num_sims) {
    # Have to re-create the data EVERY TIME or it will just be the same data over and over
    mock_data <- data_generator()
    # Run the analysis
    model <- estimator(mock_data)
    # Answer your original question (does the treatment have an effect?)
    sig_results[i] <- discriminator(model)
  }
  # Power = proportion of the time you find a statistically significant result
  sig_results %>%
    mean() %>%
    return()
}
# EXAMPLE RUNS
# These are functions that, when called, return the result of the data generator with those parameters
small_n_generator <- function() data_gen_func(5,50)
big_n_generator <-  function() data_gen_func(5,5000)
small_n_power <- calc_power(
    small_n_generator,
    estimator_func,
    discriminator_func) * 100 %>% round(2)
big_n_power <- calc_power(
    big_n_generator,
    estimator_func,
    discriminator_func) * 100 %>% round(2)
paste0("Able to correctly detect effect with small sample size ",small_n_power,"% of the time.")
# Returned: 'Able to correctly detect effect with small sample size 40.2% of the time.'
paste0("Able to correctly detect effect with large sample size ",big_n_power,"% of the time.")
# Returned: 'Able to correctly detect effect with small sample size 100% of the time.'
```

In our school example, our treatment increases the attendance rate by 5 days. This effect is constant across different schools, which have different baseline attendance rates. If our study was to only include 50 students we would only be able to say that our treatment has an effect roughly 40% of the time. If our study included 5000, we would likely never make a mistake and say that our treatment doesn’t help.

So, if we want to be powered at 80% we would be underpowered with a sample size of 50, since that design has a power of only 40%. However, if 80% is our power threshold, 5000 students may be too many since our power approaches 100%**. Obviously it would be awesome to have certainty in finding an effect of your intervention, but given resource constraints 5000 could be overkill.

### Power Curves

In our school study example enrolling 50 student participants is too few, and 5000 is overkill. In order to find out the sample size needed to meet our confidence threshold, we can generate a power curve. This is done by holding all other factors constant and increasing the sample size until our power simulation reaches a power of 80%.

```r
# STUDY DESIGN
effect_sizes <- c(0,2,5,10)
sample_sizes <- seq(20, 3000, by = 50)
 
# Create a dataframe with each effect size (es) and sample size (ss) pair
params <- expand.grid(list(es=effect_sizes,ss=sample_sizes))
 
# Create parameterized data generators for each effect/sample size pair
create_generator <- function(es,ss) function() data_gen_func(es,ss)
data_generators <- mapply(create_generator,
    params$es,
    params$ss)
 
# SIMULATION CONSTANTS
power_thresh <- 0.80
num_sims_p_step <- 100
     
power_res <- mapply(
    calc_power,
    data_generators,
    MoreArgs=list(
        estimator = estimator_func,
        discriminator = discriminator_func,
        num_sims = num_sims_p_step)
    )
results <- params  %>% mutate(power = power_res)
 
 
ggplot(results,
     aes(x = ss, y = power,group=es,color=es)) +
     geom_line(size=1) +
     # add a horizontal line at 80%
     geom_hline(aes(yintercept = power_thresh), linetype = 'dashed') +
     scale_x_continuous(trans = log_trans(),breaks=c(20,120,220,620,2020,3000)) +
     scale_y_continuous(labels = percent) +
     labs(x = 'Sample Size', y = 'Power',color='Effect Size')
```

Below shows the power covers for 4 different effect sizes (0, 2, 5, and 10 day increase in days attended) for sample sizes ranging from 20 to 3000 students. The sample size needed to reach our predefined power threshold of 0.80 (80%) depends on how big of an effect we think our intervention will have on attendance rates. If we think it will have a large effect, we only need to recruit 20 students to have a good shot at observing the effect. If we think it will have a small effect we would need to recruit hundreds.

![Power curve showing your ability to detect the effect of your treatment on school attendance (power, y-axis) by number of students enrolled (x-axis). This is done for four different effect sizes. Power threshold is dotted horizontal line and indicates being “sufficiently powered”.](https://cdn-images-1.medium.com/max/2000/1*4ln1bhls2ctQ6E4e1jCYjg.png)*Power curve showing your ability to detect the effect of your treatment on school attendance (power, y-axis) by number of students enrolled (x-axis). This is done for four different effect sizes. Power threshold is dotted horizontal line and indicates being “sufficiently powered”.*

If the intervention doesn’t have any effect and doesn’t increase attendance rates, it doesn’t matter how many students we enrol. In this case, we only report a false positive and “find an effect” roughly 5% of the time, which if you remember is the confidence threshold we set in our discriminator. Thus, you can tell that your false positive rate isn’t inflated in these analyses as well.

In the inverse, if your sample size was fixed — possibly because of budgetary constraints — you could find the minimum detectable effect size. As your effect size gets larger your power will increase, hopefully until you reach your power threshold. That then gives you a benchmark for how effective your treatment has to be for it to be detectable by your analysis.

## Conclusion

Power analyses are important in determining the credibility of statistical analyses. They are needed to determine how big of a sample you should collect, or how big of an effect would need to be present for you to observe it. While there exist standard equations for estimating power, simulations are flexible and simple approximations that can be used for any research design. They also force you to be thoughtful about the assumptions going into your mental model of the data generating process and their alignment with your analysis techniques.

The full code is available here: [https://github.com/cameron-raymond/power-simulation-tutorial](https://github.com/cameron-raymond/power-simulation-tutorial).

\* The lesson from this is *not* to collect data until you find an effect. Sample sizes should be predetermined to avoid p-hacking.

\*\* In reality you can never have power=1, but in this simulation we only did 500 runs and never encountered a sample where we couldn’t reject the null hypothesis.

## References

Abadie, A., Athey, S., Imbens, G. W., & Wooldridge, J. (2017). *When should you adjust standard errors for clustering?* (No. w24003). National Bureau of Economic Research.

Abadie, A., Athey, S., Imbens, G. W., & Wooldridge, J. M. (2020). Sampling‐Based versus Design‐Based Uncertainty in Regression Analysis. *Econometrica*, *88*(1), 265–296.

Arnold, B. F., Hogan, D. R., Colford, J. M., & Hubbard, A. E. (2011). Simulation methods to estimate design power: an overview for applied research. BMC medical research methodology, 11(1), 1–10.

Cohen, Jacob. “A power primer.” Psychological bulletin 112.1 (1992): 155.
