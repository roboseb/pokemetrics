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

October 30th, 2023

    Worked for a couples hours on this last time, and will do the same for the rest of this week, maybe even done by the end of friday. Here's why.

    Went to a halloween party on friday, and was discussing some programming stuff with a dude who seemed much better educated than me. I explained my problem with finding "similar" sized pokemon, and he drew me a little diagram that I think is exactly what I needed. If I remember to, I'll add a photo of what he showed me to this README.

    I'm gonna have to try this on a larger scale, but I think it worked, and the function now finds the true most "similar" pokemon. I have to wait for my thing to ping the pokeAPI 1200 times and collect the data I need for every pokemon, but once that's done I'll just have one somewhat gigantic JSON file but everything else on the API.

    Big fetches are done, and all the units line up now for metric.

October 31st, 2023

    Working out of USASK today, feel like a proper student. I think today will primarily consist of adding the pokemon info in to have a pokedex like thing and then some basic styling.

November 2nd, 2023

    Should have worked on this yesterday, but was distracted by a certain lady friend. We did some jigsaw puzzles.

    With the stats of the pokemon being displayed, 90% of the core UI stuff should be there, leaving me with mostly styling to do.

    Song of the day is On Fire by JOYRYDE.

November 6th, 2023

    Got upset at this last time I worked on it as I am stuck on having an image in a flex box dynamically resize down vertically. Works fine horizontally, then breaks on vertical.

    Fixed, and pretty quickly. Just a sprinkle of JS.

    I think using JS was the right call anyway, as I now have code that displays a more accurate pokemon-to-person ratio.

    Fixed a bunch of little problems that came up one after the other. Everything is now drawn onto canvases with proper resolution, and transparent whitespace is automatically removed. Biggest issue right now is that copying over the canvases is not working. Hopefully by tomorrow.

November 7th, 2023

    Still stuck on copying canvases. Gonna try to setup something really basic so I can find out what the issue is.

    Ended up moving a bunch of code around so that I could just repeat the initial canvas draw of the poke art instead of splitting it up. Works great now, no issues. Style time? Vape break first!
    
    Got a lot of good shit working. Wanna see if I can fix some basic aspect ration issues tomorrow.

November 8th, 2023

    My cough is getting worse, my sniffles have gotten better. I'll take it.

    Looking at the issue I was having with resizing certain pokeart, I think the issue isn't really art that is wider than it is tall, but we'll see.

November 9th, 2023

    Looking at my last devlog, I basically just skipped that issue for the time being to clear my head, and spent yesterday doing animations. I think when I get back to it it won't be so bad.

    Vape juice order came in. Iced cherry lime is the flavour of the day and is pretty baller.

    My previous issue with animation fill mode not keeping the last animated state was fixed by simply adding "forwards" to the animation: shorthand.

November 10th, 2023

    I need to bring the library books back which I didn't read and also need to stop being sick, asap.

    Didn't have my rockstar this morning, but I'll power through anyway. Big goal today is fixing the sizing bug somehow and finalizing the animations in the display before styling the rest.

November 13th, 2023

    Was pretty productive last week. Hoping I can keep that up an finish this project by the end of the week so I can learn blender and make a video for it by the end of next week. 20 hours is hopefully a lot of time for what I have left.

    First order of business is fixing this minor bug when switching between two resized pokemon. Then to general styling and crushing the to-do list.

    I removed the transition animation between different pokemon sizes and had the box reset when changing pokemon. This seems to have fixed my issue but I may look into a better fix so I can keep the animation.

--To-Do--

DONE-basic inputs
DONE-Enter pokemon name
DONE-enter weight
DONE-enter height
DONE-average both
DONE-show pokemon stats
-custom font
-three.js integration
-prevent errors for unexpected input
-verify fetches are sanitized with input
-implement constraints for height/weight/pokemon name length
DONE-unit options (default metric?)
DONE-person silhouette to compare sizes, keep pokemon same size never change man. Never cut pokemon art off.
-error message for pokemon not found
-figure out how to pluralize with s or x
-show height/show weight toggle
DONE-avoid recursion on infinite .catch for fetch
-mobile layout
-possible pokedex styling
-style using pokemoncolor data/extra fetch
-localstorage to save units
-tierzoo attack animations
-throw multiple pokeballs to show how many pokemon
-add feet and inches
DONE-use canvas and trim canvas to stack pokemon
-hovering over a pokemon in a stack makes all those below stay straighter but those above still wobble
-fix NaN in size display
-fix height factor 0 issues?
DONE-transition man size up and down when showing large pokemon
DONE-fix wailord is too long
DONE-fix old pokemon art showing in new size
-error modals
-fix art with issues - skarmory, raikou, dialga, metagross, electivire, muk, onix
-shadows under pokemon
-wobble toggle
-buttons that show specific pokemon, like the biggest or smallest
DONE-fix man not transitioning
DONE-app gets slower as you use it?
DONE-possibly fix pokemon not being removed if next loads too quickly
DONE-summonOpacity class is being overwritten
-man snapped animation relative to pokemon weight relative to user weight?
-random pokemon button
-add splash effect for pokemon summon
-pokeball art
-wait to finish unsummon animation before summon
-fix bug with ratio of 0 (eternatus cm)
-randomized based on generation button
-fix bug with art box not resizing in certain cases
-only show wobble button with multiple pokemon
-transition bug when switching from large to small pokemon
-fix man not following art box (don't clear everything!)

things done today


--Credits--

https://ourcodeworld.com/articles/read/683/how-to-remove-the-transparent-pixels-that-surrounds-a-canvas-in-javascript#disqus_thread (canvas trimming function)

man outline art

<a href="https://www.vecteezy.com/free-vector/man-silhouette">Man Silhouette Vectors by Vecteezy</a>