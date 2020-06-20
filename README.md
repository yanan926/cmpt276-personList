CMPT 276 Assignment 2
Due: Feb 1, 11:59:59pm.
Overview
In this assignment, you will be experimenting with NodeJS. This assignment is to be completed
individually. The following is an overview:
- Database: you should create a database table called “Person” to collect information about
a series of People. The minimum attributes for the People are name, size, height, and type
(you may use any of these attributes as you’d like). In addition, you may add as many other
Person attributes as you’d like (Be creative: P).
- Your app should have the following features:
1. The ability to add new People (with corresponding attributes).
2. The ability to change attributes of any of the People.
3. The ability to delete any of the People
4. The ability to view a detailed list of attributes for a particular Person. This can be done
by clicking on a particular person on the main display page (please see feature 5
below).
5. The ability to display (draw) all People currently in the database (including any other
information you collect). For example, if you currently have two People in your
database as follows:
Rectangle Database
name size height type
1 Bobby 150 30 A
2 Steve 200 30 EE
3 Dan 120 50 A
An example of the main display page could be displayed below (notice that not all
attributes need to be represented on the main page).
Notice Bobby and Steve have the same height, but Steve has a proportionally larger
size, Dan has a smaller size and is taller than both Bobby and Steve. Also, notice that
Bobby and Dan are the same type (you can use other values as well) and is displayed
with the same color.
It is up to you to determine an appropriate algorithm to draw the people:
Display Page
Bobby Steve
Dan
In addition, you may also add or display any other attributes you wish. Please note that
the requirement stated above is a minimum list, you may add to them as you see fit. Also,
include a list of extra features for your web application in a README file (in case they are
not immediately evident). Please be creative, part of your grade will be based on effort
and creativity.

My Extra features:
1. call a upslash API to put a picture accroding to the person's age and gender
2. use font awesome to add icons in the disaplay page represent each person's gender, cloth size, and religion type 
3. use mongoDB ALTAS database to allow users to add, edit and delete person