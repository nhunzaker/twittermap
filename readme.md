# Twittermap

For this to work, you will need to harvest data. You can do this by uncommenting the "harvest" requiring line in `app.js`.

1. Setup your twitter dev account settings and couchdb settings in `./config` (Follow sample fields):
2. Do the following:

```
npm install -d
node app
```

![Twittermap](https://github.com/nhunzaker/twittermap/raw/master/public/images/sample.png)

---

# Roadmap

- Twitter authentication to display a geographic representation of a user's network
- Better resizing of markers


# Credit where it's due:

The sentiment analysis for this map would be impossible without the exception work found at:
http://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html