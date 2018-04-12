'use strict';

angular.module('Cineboard.version', [
  'Cineboard.version.interpolate-filter',
  'Cineboard.version.version-directive'
])

.value('version', '0.5');
