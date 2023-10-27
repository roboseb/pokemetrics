# Pokemetric!

An app that lets you compare your height and weight to those of pokemon.

--Features--

--Devlog--

October 20th, 2023

    Been a while since I've actually been in the swing of things for web dev stuff. Looking forward to building stuff I come up with from scratch. Been applying to jobs for over a month now, and not much luck. May as well beef up my portfolio.

    Pokemetric will be a relatively straightforward app-toy-thing. You enter your height and/or weight and get back how many of a given pokemon that would be. Or you can find which pokemon is closest to you in stats, maybe even a handful. Maybe the multi-pokemon metrics can consist of mixed pokemon species. I think you'll also be able to choose a particular pokemon.

    I also plan to have some basic three.js integration, mostly just to give me an excuse to learn it but also so that I can learn some 3D modeling. Maybe just a pokeball.

    Regardless, first step is to get a basic layout that can talk to the API.

October 24th, 2023

    Took the weekend off and then Monday too. I think this project will be fun and easy to get into. Couple hours of work today and then maybe 1 or 2 per day for the rest of the week.

    Hopefully when I make progress I remember to record it so I can maybe make a video.

October 25th, 2023

    Hoping to crank out some more progress today as I'd like to have this done around the end of next week. With the basic inputs I have set up I can hopefully have the app tell you how many of x pokemon you are tall/heavy fairly quickly.

    We now have a system that will give you a pokemon at random if the API cannot find the one you typed out. It also gives a conversion telling you how many of a given pokemon you are tall, when it works.

October 26th, 2023

    Ate too much candy corn, we'll see how the day goes.

    Today I need to fix the unit conversion to work with chosen and random pokemon, and maybe start animating/displaying it a bit.

    The issue is of course promise timing related. Simply call sync functions from within async functions as opposed to the other way around.

October 27th, 2023

    Everything that's here works about as well as I could hope. Cleaned and dried up the code yesterday, so today I can work on actually adding features. Theoretically the only new functionality I need from here will be to add the "which pokemon am I?" feature and then maybe unit options. Everything else will be displaying info I already have and styling.

    So main issue is that getting data for one pokemon is much easier than comparing the height and weight of all 1200 at once. I think I can use the pokeAPI to write my own static JSON file that simply has height and weight associated with each pokemon.

--To-Do--

-basic inputs
DONE-Enter pokemon name
DONE-enter weight
DONE-enter height
-average both
-show pokemon stats
-custom font
-three.js integration
-prevent errors for unexpected input
-verify fetches are sanitized with input
-implement constraints for height/weight/pokemon name length
-unit options (default metric?)
person silhouette to compare sizes, keep pokemon same size never change man. Never cut pokemon art off.
-error message for pokemon not found
-figure out how to pluralize
-show height/show weight toggle
DONE-avoid recursion on infinite .catch for fetch
-mobile layout
-possible pokedex styling
-style using pokemoncolor data/extra fetch