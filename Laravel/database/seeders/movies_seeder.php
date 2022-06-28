<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class movies_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    private $titles=["The Shawshank Redemption","The Dark Knight",
        "Mad Max: Fury Road", "Interstellar",
        "A Clockwork Orange", "The Conjuring",
        "Borat", "Weathering with you",
        "Deadpool", "WALL-E",
        "Alien", "Frozen",
        "The Shape Of Water", "Gladiator",
        "The Wolf Of Wall Street", "Titanic",
        "The Godfather", "13 Assassins",
        "Parasite", "The Silence Of The Lambs",
        "The Lord of the Rings: The Fellowship of the Ring", "Spirited Away"
        ];

    private $durations=[144,152,
        120, 169,
        136, 112,
        84, 114,
        108, 98,
        117, 102,
        123, 155,
        180, 194,
        175, 141,
        132, 118,
        178, 125];

    private $dates=["1994-09-22","2008-07-24",
        "2015-05-14", "2014-11-06",
        "1972-01-13", "2013-09-26",
        "2006-11-02", "2019-07-19",
        "2016-02-11", "2008-06-27",
        "1979-05-25", "2013-12-26",
        "2017-12-01", "2000-05-05",
        "2013-12-26", "1997-12-17",
        "1972-03-24", "2010-09-25",
        "2019-05-30", "1991-06-07",
        "2001-12-19", "2001-07-20"];

    private $summaries=["Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.",
        "After Gordon, Dent and Batman begin an assault on Gotham's organised crime, the mobs hire the Joker, a psychopathic criminal mastermind who offers to kill Batman and bring the city to its knees.",
        "In a post-apocalyptic wasteland, Max, a drifter and survivor, unwillingly joins Imperator Furiosa, a rebel warrior, in a quest to overthrow a tyrant who controls the land's water supply.",
        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
        "Alex, a psychopathic delinquent, is imprisoned for murder and rape. In order to reduce his sentence, he volunteers for an experimental therapy conducted by the government, but it goes askew.",
        "The Perron family moves into a farmhouse where they experience paranormal phenomena. They consult demonologists, Ed and Lorraine Warren, to help them get rid of the evil entity haunting them.",
        "Borat, a Kazakh resident, travels to the USA to make a documentary on the country. While on his mission, he learns that the USA is the same as his own country in many ways.",
        "Set during a period of exceptionally rainy weather, high-school boy Hodaka Morishima runs away from his troubled rural home to Tokyo and befriends an orphan girl who can manipulate the weather.",
        "Ajax, a twisted scientist, experiments on Wade Wilson, a mercenary, to cure him of cancer and give him healing powers. However, the experiment leaves Wade disfigured and he decides to exact revenge.",
        "A robot who is responsible for cleaning a waste-covered Earth meets another robot and falls in love with her. Together, they set out on a journey that will alter the fate of mankind.",
        "The crew of a spacecraft, Nostromo, intercept a distress signal from a planet and set out to investigate it. However, to their horror, they are attacked by an alien which later invades their ship.",
        "Anna sets out on a journey with an iceman, Kristoff, and his reindeer, Sven, in order to find her sister, Elsa, who has the power to convert any object or person into ice.",
        "Elisa, a lonely janitor, stumbles upon an amphibious creature that is held captive in a secret research facility. She then develops a unique relationship with the creature.",
        "Commodus takes over power and demotes Maximus, one of the preferred generals of his father, Emperor Marcus Aurelius. As a result, Maximus is relegated to fighting till death as a gladiator.",
        "Introduced to life in the fast lane through stockbroking, Jordan Belfort takes a hit after a Wall Street crash. He teams up with Donnie Azoff, cheating his way to the top as his relationships slide.",
        "Seventeen-year-old Rose hails from an aristocratic family and is set to be married. When she boards the Titanic, she meets Jack Dawson, an artist, and falls in love with him.",
        "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
        "Shinzaemon, a samurai, chooses 11 assassins and a hunter to ambush and murder an evil and corrupt lord, Matsudaira Naritsugu.",
        "The struggling Kim family sees an opportunity when the son starts working for the wealthy Park family. Soon, all of them find a way to work within the same household and start living a parasitic life.",
        "Clarice Starling, an FBI agent, seeks help from Hannibal Lecter, a psychopathic serial killer and former psychiatrist, in order to apprehend another serial killer who has been claiming female victims.",
        "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.",
        "Ten-year-old Chihiro and her parents end up at an abandoned amusement park inhabited by supernatural beings. Soon, she learns that she must work to free her parents who have been turned into pigs.",
    ];

    private $images=["assets/images/movies/shawshank.jpg","assets/images/movies/darkKnight.jpg",
        "assets/images/movies/madMax.jpg","assets/images/movies/interstellar.jpg",
        "assets/images/movies/clockOrange.jpg","assets/images/movies/conjuring.jpg",
        "assets/images/movies/borat.jpg","assets/images/movies/weathering.jpg",
        "assets/images/movies/deadpool.jpg","assets/images/movies/walle.jpg",
        "assets/images/movies/alien.jpg","assets/images/movies/frozen.jpg",
        "assets/images/movies/shapeWater.jpg","assets/images/movies/gladiator.jpg",
        "assets/images/movies/WSwolf.jpg","assets/images/movies/titanic.jpg",
        "assets/images/movies/godfather.jpg","assets/images/movies/assassins.jpg",
        "assets/images/movies/parasite.jpg","assets/images/movies/silenceOfLambs.jpg",
        "assets/images/movies/lotr.jpg","assets/images/movies/spiritedAway.jpg"
        ];

    private $imgNames=["shawshank","darkKnight",
        "madMax","interstellar",
        "clockOrange","conjuring",
        "borat","weathering",
        "deadpool","walle",
        "alien","frozen",
        "shapeOfWater","gladiator",
        "wolfOfWallStreet","titanic",
        "godfather", "assassins",
        "parasite","silenceOfLambs",
        "lotr","spiritedAway",];

    private $videoLinks=["https://www.youtube.com/embed/PLl99DlL6b4","https://www.youtube.com/embed/LDG9bisJEaI",
        "https://www.youtube.com/embed/hEJnMQG9ev8", "https://www.youtube.com/embed/zSWdZVtXT7E",
        "https://www.youtube.com/embed/vN-1Mup0UI0", "https://www.youtube.com/embed/k10ETZ41q5o",
        "https://www.youtube.com/embed/dL6_G1z6ymw", "https://www.youtube.com/embed/Q6iK6DjV_iE",
        "https://www.youtube.com/embed/Xithigfg7dA", "https://www.youtube.com/embed/geplBr2fcZc",
        "https://www.youtube.com/embed/jQ5lPt9edzQ", "https://www.youtube.com/embed/TbQm5doF_Uc",
        "https://www.youtube.com/embed/XFYWazblaUA", "https://www.youtube.com/embed/P5ieIbInFpg",
        "https://www.youtube.com/embed/iszwuX1AK6A", "https://www.youtube.com/embed/CHekzSiZjrY",
        "https://www.youtube.com/embed/UaVTIH8mujA", "https://www.youtube.com/embed/Xpm007vne54",
        "https://www.youtube.com/embed/5xH0HfJHsaY", "https://www.youtube.com/embed/W6Mm8Sbe__o",
        "https://www.youtube.com/embed/V75dMMIW2B4", "https://www.youtube.com/embed/ByXuk9QqQkk"
        ];

    private $categories=[[6,5],[1,2],
        [1, 2],[12, 2],
        [6, 5], [8, 11],
        [4], [7, 3],
        [1, 7], [2, 4],
        [12, 8], [3, 9],
        [10, 7], [1, 6],
        [6, 4], [10, 6],
        [5, 6], [1, 2],
        [11, 6], [11, 8],
        [7, 2], [7, 3]];

    public function run()
    {
        for($i = 0; $i < count($this->titles); $i++) {
            $id=DB::table('movies')->insertGetId([
                'title' => $this->titles[$i],
                'duration' =>  $this->durations[$i],
                'releaseDate' =>  $this->dates[$i],
                'summary' => $this->summaries[$i],
            ]);
            DB::table('movie_properties')->insert([
                'movie_id'=>$id,
                'imageLoc' =>  $this->images[$i],
                'imageName' =>  $this->imgNames[$i],
                'videoLoc' =>  $this->videoLinks[$i],
            ]);

            for($j = 0; $j < count($this->categories[$i]); $j++){
                DB::table('movie_categories')->insert([
                    'movie_id'=>$id,
                    'category_id' =>  $this->categories[$i][$j],
                ]);
            }
        }
    }
}


