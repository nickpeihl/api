module.exports = {
  'query': {
    'bool': {
      'must': [
        {
          'match': {
            'name.default': {
              'query': 'test',
              'cutoff_frequency': 0.01,
              'boost': 1,
              'analyzer': 'peliasQueryFullToken'
            }
          }
        }
      ],
      'should': [{
        'match_phrase': {
          'phrase.default': {
            'query': 'test',
            'analyzer': 'peliasPhrase',
            'boost': 1,
            'slop': 2
          }
        }
      },{
        'function_score': {
          'query': {
            'match_phrase': {
              'phrase.default': {
                'query': 'test',
                'analyzer': 'peliasPhrase',
                'slop': 2,
                'boost': 1
              }
            }
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
            'match_phrase': {
              'phrase.default': {
                'query': 'test',
                'analyzer': 'peliasPhrase',
                'slop': 2,
                'boost': 1
              }
            }
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
            'weight': 2
          }]
        }
      }],
      'filter': [
        {
          'terms': {
            'layer': [
              'test'
            ]
          }
        },
        {
          'match': {
            'parent.country_a': {
              'analyzer': 'standard',
              'query': 'ABC'
            }
          }
        }
      ]
    }
  },
  'sort': [ '_score' ],
  'size': 10,
  'track_scores': true
};
