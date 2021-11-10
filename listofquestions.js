/*for those of you who are reading the list of questions, here is how the listOfQuestions object is created:

Type: 'normal' or 'in order'; 'normal' means that the choices will be rearranged. 'in order' means that choices will be in order for some particular reasons (i.e. "all of the above" questions)

Category: Listed from 1-5.
1 = Local customs
2 = Sensitive Hawaiian environments
3 = Leave no trace ethics
4 = Safety
5 = Neighborhood safety

The 'category' property will be used to filter out certain questions, depending on what the user wants to take the quiz on.

The 'explanation' property, as its name implies, would show the explanation when the user wants to go over any of the questions. A "C" on the explanation property will mean that the question is pretty much common sense, and no explanation will be provided.

This .js file is used simply for storage of questions. Feel free to edit any of the questions if needed. To look at the actual game code, go to game.js.

*/

var listOfQuestions = 
[{question: 'Which of these endangered animals are native to Hawaii?', choices: ['Hawaiian Monk Seal', 'Green Sea Turtle', 'Nene Goose', 'All of the above'], answer: 'All of the above', type: 'in order', category: [2], explanation: 'All of these animals, as well as other animals such as the Hawaiian hoary bat and the Oahu tree snail are endangered as well.'},

 {question: ' Before you go on a hike, what should you pack? ', choices: ['Water', 'Snacks', 'Phone', 'All of the above'], answer: 'All of the above', type: 'in order', category: [4], explanation: 'Make sure you pack all of the above! Other recommended items include jackets, a whistle, string, and a flashlight.'}, 

 {question: 'You should let someone know where you are going before going on a hike because: ', choices: ['It will make them jealous and want to go with you next time.', 'If you get lost someone will know where you went so they can send help.', 'It doesn’t matter if you tell them.', 'So they can regularly supply things to you.'], answer: 'If you get lost someone will know where you went so they can send help.', type: 'normal', category: [4], explanation: 'You should always tell someone where you\'re going, and also what time you would perhaps be back.'}, 

 {question: 'What is the tallest mountain in the world, at more than 32,000 feet?', choices: ['Everest', 'Mauna Kea', 'Mauna Loa', 'Kaimana Hila'], answer: 'Mauna Kea', type: 'normal', category: [4], explanation: 'Measuring exactly at 32,796 feet, Mauna Kea is the tallest mountain, from sea level. Better yet, you can hike it!'}, 

 {question: 'What chemicals found in sunscreens can harm coral reefs?', choices: ['Oxybenzone', 'Cholecalciferol', 'Methane', 'Bicarbonate'], answer: 'Oxybenzone', type: 'normal', category: [2],explanation: 'Oxybenzone is one of the chemicals that could harm coral reefs by damaging its DNA, causing coral bleaching. Avobenzone and octinoxate are other chemicals that can harm coral reefs.'}, 

 {question: 'If you see an endangered animal, one thing that you should NOT do is:', choices: ['Approach and touch it', 'Keep your distance', 'Admire it from afar', 'Take a picture'], answer: 'Approach and touch it', type: 'normal', category: [2], explanation: 'C'}, 

 {question: 'Impaired movement of marine animals\' limbs, suffocation of fish, and accidental digestion of plastics by animals can all be caused by', choices: ['Air pollution', 'Littering', 'Nicotinamide adenine dinucleotide phosphate', 'Sunscreen'], answer: 'Littering', type: 'normal', category: [2], explanation: 'More specifically, littering of plastics can cause fish to be entangled in nets, choke them due to attempted swallowing, or they could struggle to get the plastic out of their body. Imagine if this happens to endangered species!'}, 

 {question: 'Please respect Hawaii\'s environment by NOT:', choices: ['Taking plants', 'Taking rocks', 'Carving your name into trees', 'All of the above'], answer: 'All of the above', type: 'in order',  category: [2], explanation: 'Please don\'t do those types of things - especially carving your name into trees! That is silly.'}, 

 {question: 'When on a hike, make sure to NOT venture off trail because:', choices:['It may cause erosion', 'You may spot an endangered animal', 'You may get lost', 'Both the first and third choice'], answer: 'Both the first and third choice', type: 'in order', category: [2, 4], explanation: 'C'}, 

 {question: 'What is ocean in Hawaiian?', choices: ['Moana', 'Mauka', 'Ewa', 'Kilauea'], answer: 'Moana', type: 'normal', category: [2, 6], explanation: 'C'}, 

 {question: 'The ohia tree, one of Hawaii’s most abundant trees, is being wiped out by an invasive fungal disease, so please make sure to:', choices: ['Clean your gear to not carry invasive species', 'Bring new species to Hawaii', 'Leave trash and litter', 'Use environmentally harmful bug repellent'], answer: 'Clean your gear to not carry invasive species', type: 'normal', category: [2], explanation: 'Invasive species are a threat to nature, so please be sure to not bring anything that isn\'t native to Hawaii.'},

 {question: 'Your friend leaves the park without containing the camp fire. Do you...', choices: ['Leave it', 'Contain it yourself', 'Call 911', 'none of the above'], answer: 'Call 911', type: 'in order', category: [3], explanation: 'It is always best to call 911 in this situation and let the authorities handle it'},

 {question: 'Your dog poops while walking. Do you', choices: ['Pick it up', 'Leave it', 'Take a picture and flex it on instagram', 'None of the above'], answer: 'Pick it up', type: 'in order', category: [3], explanation: 'In any situation, you should clean up after yourself leaving everything the same or better than you found it'},

 {question: 'You drop some trash leaving your friend’s car. Do you', choices: ['Leave it', 'Pick it up and dispose of it properly', 'Dump it in the ocean', 'None of the above'], answer: 'Pick it up and dispose of it properly', type: 'in order', category: [3], explanation: 'In any situation, you should clean up after yourself leaving everything the same or better than you found it'},

 {question: 'You encounter a wild boar on a hike. Do you', choices: ['Respect it and leave it be', 'Chase it down', 'Throw trash at it', 'None of the Above'], answer: 'Respect it and leave it be', type: 'in order', category: [3], explanation: 'intruding on another animals space may end up hurting either it or yourself'},

 {question: 'Another group is ruining your photo. Do you', choices: ['Push them', 'Wait or ask them to move', 'Insult them', 'None of the Above'], answer: 'Wait or ask them to move', type: 'in order', category: [3], explanation: 'You should not inconvience another group'},

 {question: 'What word is used to greet people and means “hello”?', choices: ['Ohana', 'Aloha', 'Lanai', 'Maka'], answer: 'Aloha', type: 'normal', category: [1], explanation: 'Aloha means hello in hawaiian'},

 {question: 'What food originated in Hawaii?', choices: ['Poi', 'Lau Lau', 'kalua pig', 'All of the above'], answer: 'All of the above', type: 'in order', category: [1], explanation: 'Poi, Lau Lau, and Kalua Pig are all native to hawaii'},

 {question: 'Native Hawaiians refer to themselves as kama’aina which means people of the land', choices: ['True', 'False'], answer: 'True', type: 'in order', category: [1], explanation: 'kama’aina is used to refer to Hawaii natives'},

 {question: 'Touching noses with somebody is called “ha” and means the breath of life', choices: ['True', 'False'], answer: 'True', type: 'in order', category: [1], explanation: 'touching noses is a greeting symbolizing the breath of life'},

 {question: 'What is a way to show friendship, love, or celebrate or honor someone?', choices: ['Going to the beach by yourself ', 'Stealing someone else’s food', 'Giving a lei', 'A high five '], answer: 'Giving a lei', type: 'normal', category: [1], explanation: 'Giving a lei to someone symbolizes friendship, love, celebration, and honor'},
];



