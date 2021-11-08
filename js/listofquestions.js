/*for those of you who are reading the list of questions, here is how the listOfQuestions object is created:

Type: 'normal' or 'in order'; 'normal' means that the choices will be rearranged. 'in order' means that choices will be in order for some particular reasons (i.e. "all of the above" questions)

Category: Listed from 1-5.
1 = Local customs
2 = Sensitive Hawaiian environments
3 = Leave no trace ethics
4 = Safety
5 = Neighborhood safety

The 'category' property will be used to filter out certain questions, depending on what the user wants to take the quiz on.

This .js file is used simply for storage of questions. Feel free to edit any of the questions if needed. To look at the actual game code, go to game.js.

*/

var listOfQuestions = 
[{question: 'Which of these endangered animals are native to Hawaii?', choices: ['Hawaiian Monk Seal', 'Green Sea Turtle', 'Nene Goose', 'All of the above'], answer: 'All of the above', type: 'in order', category: 2/*, explanation: 'All of these animals, as well as other animals such as the Hawaiian hoary bat and the Oahu tree snail are endangered as well.'*/},

 {question: 'What is the most widely used illicit drug amongst adolescents?', choices: ['Nitrous oxide', 'Marijuana', 'Cocaine', 'Heroin'], answer: 'Marijuana', type: 'normal', explanation: 'Marijuana is the most widely used illicit drug amongst adolescents. According to the 2020 Monitoring the Future study among adolescents, the lifetime prevalence of use of marijuana among 12th graders is 61.5% - meaning that 61.5% of 12th graders have used marijuana at least once in their life. Scary, right?'}, 

 {question: 'According to the New England Journal of Medicine, what are the three stages of substance use disorders?', choices: ['Guilt, craving, high', 'Craving, crash, fun', 'Anticipation, craving, consuming', 'Intoxication, withdrawal, anticipation'], answer: 'Intoxication, withdrawal, anticipation', type: 'normal', explanation: 'The New England Journal of Medicine divided the cycle of substance use disorders into three stages: Intoxication, withdrawal, and anticipation. In the intoxication state, the user injects or consumes the substance. The substance begins to elicit a extremely euphoric effect, maiing the user feel good. In the withdrawal state, the euphoric effect of the substance wears off, and the individual experiences heightened sensitivity to stress, irritability, and dysphoric. In the anticipation state, the individual is ready to get out of the withdrawal state and is starting to crave the substance again. He starts thinking how, when, and where he could obtain the substance again.'}, 

 {question: 'Which of the following reasons may be the reason why people start using substances?', choices: ['Peer pressure', 'Boredom', 'Curiosity', 'All of the above'], answer: 'All of the above', type: 'in order', explanation: 'All of these - and many more reasons, such as the environment, stress, or depression, may cause people to start using substances.'}, 

 {question: 'What is the active ingredient in marijuana?', choices: ['Methionine', 'THC', 'Methane', 'Dopamine'], answer: 'THC', type: 'normal', explanation: 'THC, or also called delta-9-tetrahydrocannabinol, is the active ingredient in marijuana. THC looks similar to a neurotransmitter in the brain, known as anandamide. Therefore, it is able to "fool" the brain into thinking it is anandamide, and could start affecting different parts the brain. (Source: https://www.drugabuse.gov/publications/research-reports/marijuana/how-does-marijuana-produce-its-effects)'}, 

 {question: 'What is the leading cause of preventable death in the United States?', choices: ['Alcohol use', 'Heart attacks', 'Smoking', 'Methamphetamine'], answer: 'Smoking', type: 'normal'}, 

 {question: 'When exposed to the "high" of a substance so many times, you may start feeling anxious, excited, or agitated when you are exposed to outside stimuli that remind you of the substance. This is known as?', choices: ['Axon transfer', 'Neuron jumps', 'Classical conditioning', 'Memory recall'], answer: 'Classical conditioning', type: 'normal', explanation: 'Classical conditioning, or Pavlovian conditioning, explains the phenomenon. For example, let\'s create another hypothetical situation where you use marijuana with your friend all the time in the school bathrooms. When exposed to the \'high\' of marijuana so many times, you may start to feel a bit of \'anticipation\' when you 1) see your friend\'s house, 2) smell marijuana, or 3) pass by the school bathrooms. This phenomenon is named after an experiment that Ivan Pavlov, a Russian physiologist, did with dogs.'}, 

 {question: 'More than __ out of 10 teenagers mistakenly believe it is safer to use prescription drugs than illicit drugs.', choices: ['2', '3', '4', '5'], answer: '4', type: 'in order', explanation: '41% of teenagers believe that prescription drugs are safer than normal drugs. Unfortunately, that is not the case. Prescription drugs can be just as addictive as normal drugs, which is the reason why they are prescribed in such a "controlled" amount.'}, 

 {question: 'Is there a difference between substance use and substance use disorders?', choices: ['No, the terms are used interchangeably.', 'No, all people who have used a substance can be classified as having a substance use disorder.', 'Yes, substance use disorders can be caused by substance use, and it is a behavioral problem.', 'Yes, substance use disorders can be caused by substance use, and has physical signs and symptoms.'], answer: 'Yes, substance use disorders can be caused by substance use, and it is a behavioral problem.', type: 'in order', explanation: 'There is a difference between substance use and substance use disorders. Substance use disorders is the uncontrollable use of a particular substance, and it is a behavioral problem. Substance use, as its name implies, is when an individual uses a substance. The danger of substance use is that it could lead to substance use disorders.'}, 

 {question: 'Why is substance use so harmful?', choices: ['It could lead to substance use disorders.', 'The substances can do harmful things to your own body.', 'Substance use may affect people around you.', 'All of the above'], answer: 'All of the above', type: 'in order', explanation: 'Substance use is dangerous because first, it could lead to substance use disorders. It is also dangerous because some of the substances can do dangerous things to your body (an example is vaping - vapes contain carcinoges which are chemicals that may cause caner in the future.) Finally, the effect that these substances can have on your body is that it could affect others around you as well (i.e. you may become violent as a direct result of a substance.)'}, 

 {question: 'About ____ of marijuana users in high school get D\'s and F\'s.', choices: ['Half', 'a third', 'a quarter', 'three-quarters'], answer: 'Half', type: 'normal', explanation: 'To be exact, 48% of marijuana users in high school get D\'s and F\'s. This is opposed to 10% of marijuana users who get A\'s.'}, 

 {question: 'According to the British Drug Survey of 2014, more than 80% of drug users reported that ____ was their first illicit drug that they used?', choices: ['Cocaine', 'Marijuana', 'Methamphetmaine', 'LSD'], answer: 'Marijuana', type: 'normal', explanation: '82% of respondents stated that marijuana was the first illicit drug they tried, followed by 6% with amphetamines. Other drugs included: magic mushrooms, LSD, crack, cocaine, and MDMA(ecstasy).'}, 

 {question: 'According to the British Drug Survey of 2014, about __% of drug users stated that they started to use substances when they were below 18.', choices: ['27', '38', '55', '64'], answer: '64', type: 'in order', explanation: '64% of drug users first started using when they were below 18 (still an adolescent). This shows how susceptible adolescents are to fall into substance use.'},

 {question: 'Vapes contain ______, which are chemicals that may cause cancer.', choices: ['Dopamine', 'Nicotine', 'Carcinogens', 'Epinephrines'], answer: 'Carcinogens', type: 'normal', explanation: 'null'}];