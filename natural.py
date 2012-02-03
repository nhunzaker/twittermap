from __future__ import division 
import nltk, urllib2, simplejson
# --------------------------------------------- #

question = raw_input( "What are you looking for? \n")

question = nltk.word_tokenize(question)

nltk.pos_tag(question)

tweets = []

for i in range(1, 11):    
    url = "http://search.twitter.com/search.json?callback=?&rpp=100&q=%s&page=%s" % (question, i) 
    json = urllib2.urlopen(url).read()
    tweets += simplejson.loads(json)["results"]

print "Found %s tweets" % ( len(tweets))

# Feed them in to raw text
raw = ""
for tweet in tweets: raw += tweet["text"] 

# --------------------------------------------- #

#NLTK Processing:
tokens = nltk.word_tokenize(raw)
text = nltk.Text(tokens)

def ask():
    query = raw_input("Please specify a word to search for: ")
    result = text.similar(query)
    print result
    
    ask()

# Boot it up
ask()
