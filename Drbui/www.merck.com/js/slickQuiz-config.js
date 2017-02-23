// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Take the Quiz",
        "main":    " ",
        "results": " ",
        "level1":  " ",
        "level2":  " ",
        "level3":  " ",
        "level4":  " ",
        "level5":  " " // no comma here
    },
    "questions": [
        { // Question 1 - Multiple Choice, Single True Answer
            "q": "What is a parasite called that lives inside of your pet?",
            "a": [
                {"option": "Ectoparasite",      "correct": false},
                {"option": "Endoparasite",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> Endoparasites live inside the host (i.e, inside the animal that carries – or ‘hosts’ – it), affecting the gastrointestinal tract, liver, or other internal organs. The most common endoparasites of companion animals are worms. Ectoparasites live on the host, affecting skin, fur, or ears.</p>",
            "incorrect": "<p><span>Incorrect.</span> Endoparasites live inside the host (i.e, inside the animal that carries – or ‘hosts’ – it), affecting the gastrointestinal tract, liver, or other internal organs. The most common endoparasites of companion animals are worms. Ectoparasites live on the host, affecting skin, fur, or ears.</p>" // no comma here
        },
        { // Question 2 - Multiple Choice, Multiple True Answers, Select Any
            "q": "What is the most common ectoparasite for cats and dogs?",
            "a": [
                {"option": "Fleas",    "correct": true},
                {"option": "Ticks",   "correct": false},
                {"option": "Leeches",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct!</span> Fleas are probably the most common ectoparasite (external parasite) of dogs and cats worldwide. In addition to just being a nuisance, fleas are responsible for flea allergy dermatitis (FAD) in dogs and cats, which is estimated to account for over 50 percent of all the dermatological cases reported to veterinarians.</p>",
            "incorrect": "<p><span>Incorrect.</span> Fleas are probably the most common ectoparasite (external parasite) of dogs and cats worldwide. In addition to just being a nuisance, fleas are responsible for flea allergy dermatitis (FAD) in dogs and cats, which is estimated to account for over 50 percent of all the dermatological cases reported to veterinarians.</p>" // no comma here
        },
        { // Question 3 - Multiple Choice, Multiple True Answers, Select All
            "q": "Which parasite transmits heartworm?",
            "a": [
                {"option": "Mosquitos",   "correct": true},
                {"option": "Ticks",   "correct": false},
                {"option": "Fleas",  "correct": false} // no comma here
            ],
            "correct": "<p><span>That's right!</span> Mosquito bites can be dangerous for dogs because they can be vectors of a severe, parasitic disease called heartworm or filariasis. Heartworm is the most serious common parasite for dogs.  It stresses the dog’s heart by restricting blood flow, can damage other internal organs, and left untreated, the disease can be fatal.</p>",
            "incorrect": "<p><span>Incorrect.</span> Mosquito bites can be dangerous for dogs because they can be vectors of a severe, parasitic disease called heartworm or filariasis. Heartworm is the most serious common parasite for dogs.  It stresses the dog’s heart by restricting blood flow, can damage other internal organs, and left untreated, the disease can be fatal.</p>" // no comma here
        },
        { // Question 4
            "q": "How are tapeworms transmitted?",
            "a": [
                {"option": "Mites",    "correct": false},
                {"option": "Fleas",     "correct": true},
                {"option": "Feces",      "correct": false} // no comma here
            ],
            "correct": "<p><span>That's right!</span> Through fleas. The dog tapeworm is a parasite spread to dogs, cats, and people through the ingestion of infected fleas. This parasite is common but rarely causes illness in pets or people. Infections with Dipylidium caninum can sometimes be detected by finding rice-like segments of the tapeworm crawling near the anus or in fresh bowel movements. In severe infections, pets can lose weight and have mild diarrhea.</p>",
            "incorrect": "<p><span>Incorrect.</span> Through fleas. The dog tapeworm is a parasite spread to dogs, cats, and people through the ingestion of infected fleas. This parasite is common but rarely causes illness in pets or people. Infections with Dipylidium caninum can sometimes be detected by finding rice-like segments of the tapeworm crawling near the anus or in fresh bowel movements. In severe infections, pets can lose weight and have mild diarrhea.</p>" // no comma here
        },
        { // Question 5
            "q": "True or False: When your dog has tapeworms, there are many obvious symptoms, such as your dog scooting on the floor.",
            "a": [
                {"option": "True",    "correct": false},
                {"option": "False",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> Most tapeworms do not produce obvious symptoms. The best detection is seeing if your dog has segments of the worms around his anus or stool; they look like grains of rice.</p>",
            "incorrect": "<p><span>Incorrect.</span> Most tapeworms do not produce obvious symptoms. The best detection is seeing if your dog has segments of the worms around his anus or stool; they look like grains of rice.</p>" // no comma here
        },
		{ // Question 6
            "q": "A zoonotic disease is:",
            "a": [
                {"option": "A disease found primarily in zoos.",    "correct": false},
				{"option": "A disease that can be passed between animals and humans.",    "correct": true},
                {"option": "A disease that causes schizophrenia in cats.",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> A zoonotic disease is a disease that can be passed between animals and humans. Zoonotic diseases can be caused by viruses, bacteria, parasites, and fungi.</p>",
            "incorrect": "<p><span>Incorrect.</span> A zoonotic disease is a disease that can be passed between animals and humans. Zoonotic diseases can be caused by viruses, bacteria, parasites, and fungi.</p>" // no comma here
        },
		{ // Question 7
            "q": "It takes how many hours to fully transmit Lyme Disease from a tick once it attaches to the host?",
            "a": [
                {"option": "1-3 hours",    "correct": false},
				{"option": "10-15 hours",    "correct": false},
                {"option": "24-72 hours",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> Animal studies have shown an exponential increase in the risk of Lyme Disease infection after 48–72 hours of deer tick attachment. While the longer the tick is attached, the higher the risk of transmission, it is possible to get Lyme disease even if the tick is attached for less than 24 hours.</p>",
            "incorrect": "<p><span>Incorrect.</span> Animal studies have shown an exponential increase in the risk of Lyme Disease infection after 48–72 hours of deer tick attachment. While the longer the tick is attached, the higher the risk of transmission, it is possible to get Lyme disease even if the tick is attached for less than 24 hours.</p>" // no comma here
        },
		{ // Question 8
            "q": "How did my pet get the <em>Dipylidium</em> tapeworm?",
            "a": [
                {"option": "Through a tick bite.",    "correct": false},
				{"option": "Through a mosquito bite.",    "correct": false},
                {"option": "Through ingesting a flea.",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> By swallowing a flea infected with a tapeworm larvae. A dog or cat may swallow a flea while self-grooming. Once the flea is digested by the dog or cat, the larval tapeworm is able to develop into an adult tapeworm .</p>",
            "incorrect": "<p><span>Incorrect.</span>By swallowing a flea infected with a tapeworm larvae. A dog or cat may swallow a flea while self-grooming. Once the flea is digested by the dog or cat, the larval tapeworm is able to develop into an adult tapeworm .</p>" // no comma here
        },
		{ // Question 9
            "q": "True or false: A tick bite can cause paralysis.",
            "a": [
                {"option": "True",    "correct": true},
                {"option": "False",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> Tick paralysis is a rare disorder that can affect humans as well as cats and dogs. It is caused by over 40 species of ticks worldwide and five in North America, including the Deer Tick. In animals, tick paralysis can cause loss of coordination in the hind legs. For humans, symptoms include acute, ascending, flaccid paralysis. Within 24 hours of removing the tick, the paralysis typically subsides.</p>",
            "incorrect": "<p><span>Incorrect.</span>Tick paralysis is a rare disorder that can affect humans as well as cats and dogs. It is caused by over 40 species of ticks worldwide and five in North America, including the Deer Tick. In animals, tick paralysis can cause loss of coordination in the hind legs. For humans, symptoms include acute, ascending, flaccid paralysis. Within 24 hours of removing the tick, the paralysis typically subsides.</p>" // no comma here
        },
		{ // Question 10
            "q": "A walking dandruff mite is ...",
            "a": [
                {"option": "A mite that wears little sneakers.",    "correct": false},
				{"option": "A mite that carries a walking stick.",    "correct": false},
                {"option": "A Cheyletiella mite.",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> Cheyletiellosis, also called walking dandruff, is a highly contagious skin disease of cats caused by Cheyletiella mites. They cause excessive flaking of the skin, or dandruff, and their movement on the top layer of skin gives the disease its distinctive name.</p>",
            "incorrect": "<p><span>Incorrect.</span> Cheyletiellosis, also called walking dandruff, is a highly contagious skin disease of cats caused by Cheyletiella mites. They cause excessive flaking of the skin, or dandruff, and their movement on the top layer of skin gives the disease its distinctive name.</p>" // no comma here
        } // no comma here
    ]
};
