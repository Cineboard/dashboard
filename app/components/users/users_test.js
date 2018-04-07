'use strict';

describe('Cineboard.users module', function () {

    beforeEach(module('Cineboard.users'));

    describe('Users Controller', function () {
        it('should ....', inject(function ($controller) {
            //spec body
            var scope = "";
            var provider = "";
            var Ctrl = $controller('UsersController', {$scope:scope, UsersService:provider});
            expect(Ctrl).toBeDefined();
        }));

    });
});
