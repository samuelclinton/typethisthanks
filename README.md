![Type this, thanks](https://i.imgur.com/LgPBylM.png)

> *I don't really understand what's going on but it is really cool Sam.*
> **My mother about ttt.js**

**ttt.js** is a simple *Vanilla JS* script that types (and then erases) one or many strings. It also supports looping and has settings that can be modified to change the speed of the animations.

## How to use

First download [ttt.js](https://github.com/samuelclinton/typethisthanks/tree/main/dist) (from this very repo go to the *dist* folder and grab it, how convenient eh?) and include it in the page you want to type stuff into, before the closing `</body>` tag. Then initialize the script by calling the function `ttt.start(true)` (or false if you don't want to enable looping)

	<script src="ttt.js"></script>
	<script>
		ttt.start(true)
	</script>

### Optional (but highly recommended) step

*setTimeout* and *setInterval* are paused or delayed when the tab that's running the script loses focus, to fix that I'm using another script called **HackTimer.js**, *HackTimer* basically overrides the *setTimeout* and *setInterval* methods to use *Web Workers* and as such make it possible for them to run in the background.
To use it go and grab it from the [Github repository](https://github.com/turuslan/HackTimer) and then include it inside your `<head>` tag. As simple as that.

	<script src="HackTimer.js"></script>

## Customizing
Now to the fun part, customizing it, the settings are stored in a constant called settings (how original heh?) in the ttt.js script.

| setting | description | data type | default |
|--|--|--|--|
| containerClass | The container class where the text will be typed | string | ttt-container |
| cursorClass | The cursor class used for customizing the cursor | string | ttt-cursor |
| cursorBlinkSpeed | The speed at which the cursor blinks in miliseconds | int| 400 |
| initialDelay | The delay before the animation starts in miliseconds | int | 150 |
| typeDelay | The delay between each letter typed in miliseconds | int | 50 |
| eraseDelay | The delay between each letter erased in miliseconds | int | 50 |
| readTime | Time that the word stay static before beginning the erasing animation | int | 3000 |
| timeBetweenWords | Time between words | int | 1000 |
| strings | Array of the strings that will be typed | array[string]| none |

## A few words before I go
I'm not a front-end developer but even I can see that there are improvements to be made here, this is something I developed for my personal website and there are ~~much~~ better options for complex use cases.  In the future if I had the time I would implement this differently, maybe using *Web Workers* from the start, so I wouldn't have to rely on HackTimer.js (even though it is a pretty awesome script), I would also add support to multiple containers.  
But as simple as this is, it just works for my needs and maybe will work for you as well, if so leave a star on this ;)
Also props to [Ruslan Tushov](https://github.com/turuslan) for making the HackTimer.js his script just works flawlessly and solves a intended "bug" that my approach had.
