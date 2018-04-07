'use strict';

describe('myApp.users module', function() {

    beforeEach(module('myApp.users'));

    describe('Users controller', function() {

        it('USERS should list all /users', inject(function ($controller) {
            //spec body
            var Ctrl = $controller('UsersCtrl');
            expect(Ctrl).toBeDefined();
        }));

    });
});
