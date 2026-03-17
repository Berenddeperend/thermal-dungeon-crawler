# thermal-dungeon-crawler
Inspired by One Card Dungeon.

# Why
Because I wanted the card game but it's sold out. And I have thermal printer setup which prints me a weekly newspaper. I thought it'd be fun to do a weekly dungeon crawler puzzle.

# How
Just thinking out loud here for now. This service runs on my rpi4. It exposes an endpoint where it returns an image of a generated dungeon. The game will have multiple levels, one dungeon is one level.

Maybe this app should use Konva to draw a canvas, maybe in plain html/css with a HTML-to-Canvas system. Not sure yet. CSS grid might be very suitable.

My thermal printer service should, when building the newspaper, call the endpoint and draw the dungeon as an image. I'm not sure yet which service should be in control of selecting the level. Probably this repo.
