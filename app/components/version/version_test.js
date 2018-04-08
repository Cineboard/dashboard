'use strict';

describe('Cineboard.version module', function() {
  beforeEach(module('Cineboard.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.3');
    }));
  });
});
