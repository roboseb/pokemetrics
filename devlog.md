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

November 14th, 2023

    Cough has not massively improved, but I'm feeling pretty good. Gonna fix one of the final resizing issues then get through some bug fixes before introducing some real styling and UI/UX.

November 15th, 2023

    Ended work on this early yesterday cause I was helping my mom move. Her sister's car broke down, so what should have been done quickish took us almost 10 hours. Regardless, I'm back and there's yet work to do.

    Gonna start by I think adding feet and inches at least for the pokemon's displayed info.

November 16th, 2023

    I found this cool site called interfaceingame.com that basically just has clips and screenshots of in game UIs, very handy for informing some styling.

November 17th, 2023

    App is running real slow in the VM since I started styling. Not sure why exactly. Animations and everything are lagging even after updating some VM settings and basically removing all of the new styled stuff. Gonna try hosting it with github to see if it runs ok out of the VM.

    Animations look fine on hosted site. As expected, there are unfortunately a myriad of errors when hosting compared to running locally. So I'll have to deal with those later.

    Pretty easy work styling most of the buttons since I can just copy and paste the zelda btn format and css/JS take care of the rest.

November 20th, 2023

    Styling, mobile layout, and fix the issues when hosted on github. That's what I've got left I think. Now that I'll be doing four hours of work per day it should be done pretty quick. Then the promotion and the video.

November 21st, 2023

    Hung out my grandma for a while today, so I probably won't end up doing the full 5 hours of work, but I'll try to do about two I think. Maybe enough time to get this button working and start the mobile layout. 
    
    For some reason this pokemon details box will not flex to fill container while also not growing it. I think I will limit the size of the pokedex tomorrow and see if that help.

November 22nd, 2023

    Busy day again today. Hopefully I can get through 5 hours of work today so that I can make some serious progress and wrap this up before the end of the week.

Novemeber 23rd, 2023

    Three hours yesterday, hopefully the full five today. Gonna start with restyling the dpad, cause it looks real dumb in mobile and with the full framerate. Mobile layout is basically done already and looks pretty good.

    After my mobile layout grind yesterday and a little bit of fixing imports today, there is officially a hosted version that runs very well on desktop and mobile. And I am happy.

November 24th, 2023

    God damn this took almost 20 hours longer than expected to get done. It always takes twice as long as you think, even accounting for it taking twice as long.

    App works really well though. Just gotta spend today cleaning up some to-do stuff and adding whatever little features I can in 5 hours.

January 23rd, 2024

    Coming back to this to do some bugfixing before promoting it more heavily as a main project.

    Fixed the unit measurement bug by removing exactly one "=".

    Fixed issue with pokedex being cut off while wobbling on wider layouts.

    Fixed bug with trying to summon new pokemon too quickly in succession.

    Moved navbar back to top to prevent issues with mobile layout on some devices.