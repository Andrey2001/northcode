import re
from math import log

class LanguageModel(object):
  def __init__(self, model_dict):
    # Build a cost dictionary, assuming Zipf's law and cost = -math.log(probability).
    self._wordcost = dict((k, log((i+1)*log(len(model_dict)))) for i,k in enumerate(model_dict))
    self._maxword = max(len(x) for x in model_dict)
   

  def split(self, s):
    """Uses dynamic programming to infer the location of spaces in a string without spaces."""
    _SPLIT_RE = re.compile("[^а-яёА-ЯЁ0-9']+")
    l = [self._split(x) for x in _SPLIT_RE.split(s)]
    return [item for sublist in l for item in sublist]


  def _split(self, s):
    # Find the best match for the i first characters, assuming cost has
    # been built for the i-1 first characters.
    # Returns a pair (match_cost, match_length).
    def best_match(i):
      candidates = enumerate(reversed(cost[max(0, i-self._maxword):i]))
      return min((c + self._wordcost.get(s[i-k-1:i].lower(), 9e999), k+1) for k,c in candidates)

    # Build the cost array.
    cost = [0]
    for i in range(1,len(s)+1):
      c,k = best_match(i)
      cost.append(c)

    # Backtrack to recover the minimal-cost string.
    out = []
    i = len(s)
    while i>0:
      c,k = best_match(i)
      assert c == cost[i]
      # Apostrophe and digit handling (added by Genesys)
      newToken = True
      if not s[i-k:i] == "'": # ignore a lone apostrophe
        if len(out) > 0:
          # re-attach split 's and split digits
          if out[-1] == "'s" or (s[i-1].isdigit() and out[-1][0].isdigit()): # digit followed by digit
            out[-1] = s[i-k:i] + out[-1] # combine current token with previous token
            newToken = False
      # (End of Genesys addition)

      if newToken:
        out.append(s[i-k:i])

      i -= k

    return reversed(out)