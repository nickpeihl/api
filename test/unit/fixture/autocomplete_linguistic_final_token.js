module.exports = {
  'query': {
    'bool': {
      'must': [{
        'match_phrase': {
          'name.default': {
            'analyzer': 'peliasQueryFullToken',
            'boost': 1,
            'slop': 3,
            'query': 'one'
          }
        }
      }],
      'should':[{
        'match_phrase': {
          'phrase.default': {
            'analyzer': 'peliasPhrase',
            'boost': 1,
            'slop': 3,
            'query': 'one'
          }
        }
      },{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'popularity',
              'missing': 1
            },
            'weight': 1
          }]
        }
      },{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'population',
              'missing': 1
            },
            'weight': 3
          }]
        }
      }]
    }
  },
  'sort': [ '_score' ],
  'size': 20,
  'track_scores': true
};
