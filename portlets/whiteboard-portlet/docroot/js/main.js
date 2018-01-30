/**
 * Copyright (C) 2005-2014 Rivet Logic Corporation.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation; version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

AUI().use('multiuser-whiteboard', function(A) {

    A.on('domready', function() {

    	var SELECTOR_WHITEBOARD_PORTLET = '.whiteboard-portlet';
    	var SELECTOR_CANVAS = 'canvas';
    	var SELECTOR_EDITOR = '.editor';
    	var SELECTOR_TEXT_EDITOR = '.text-editor';
    	var SELECTOR_ONLINE_USERS_TEMPLATE = '#users-online-template';
    	var SELECTOR_USER_TOOLTIPS_TEMPLATE = '#user-tooltips-template';
    	var CANVAS_NAME = 'editor-canvas';
    	var SPACE = ' ';
    	var DASH = '-';


        var containerWidth = A.one(SELECTOR_WHITEBOARD_PORTLET + SPACE + SELECTOR_EDITOR).width();
        var canvas = new fabric.Canvas(CANVAS_NAME, {
            width: containerWidth,
            height: 600
        });
        canvas.renderAll();
        canvas.calcOffset();

        A.on(['orientationchange', 'resize'], function(e) {
            containerWidth = A.one(SELECTOR_WHITEBOARD_PORTLET + SPACE + SELECTOR_EDITOR).width();
            canvas.setDimensions({
                width: containerWidth,
                height: 600
            });

            canvas.renderAll();
            canvas.calcOffset();
        });

        var editor = new A.MultiuserEditor({
            canvas: canvas,
            container: A.one(SELECTOR_WHITEBOARD_PORTLET + SPACE + SELECTOR_EDITOR),
            textEditorNode: A.one(SELECTOR_WHITEBOARD_PORTLET + SPACE + SELECTOR_TEXT_EDITOR),
            editorId: (Liferay.ThemeDisplay.getUserId() + DASH + Math.floor((Math.random() * 10) + 100)),
            useAtmosphere: true,
            containerWidth: containerWidth,
            onlineUsersTemplate: A.one(SELECTOR_ONLINE_USERS_TEMPLATE).get('innerHTML'),
            usersTooltipsTemplate: A.one(SELECTOR_USER_TOOLTIPS_TEMPLATE).get('innerHTML'),
            baseImagePath: Liferay.ThemeDisplay.getPathImage(),
            userName: (Liferay.ThemeDisplay.getUserName() != '') ? Liferay.ThemeDisplay.getUserName() : 'Guest', /* for user tooltip */
            userImagePath: A.one('.whiteboard-portlet .profile-image-path').get('value') /* for user tooltip */
        });
    });
});
