# sticky notes

A secure web application where users can sign up using a username and password. Members can create, view, edit, and delete their own posts, as well as browse posts from other community members. Administrators have elevated privileges to edit or delete any post on the platform.

## what I learned

This project was my first time really putting together a full Express app with auth and sessions. It was not super complicated on the outside, but it taught me a lot about how the flow of a web app works under the hood.

An app is easier to build when you separate the responsibilities.

- routes handle the URLs
- controllers handle the logic
- database queries handle the data
- views show the page
- passport handles the login flow

This project made me understand that structure matters a lot. If everything is in one place, it becomes hard to follow. Once I started separating things a little better, especially after adding validators, the code started to make more sense.

## passport js was the hardest part

Passport js was very hard to understand at first. The code still looks unfamiliar sometimes, and I still do not feel fully comfortable with it yet. It felt like a lot of magic at the beginning.

Why is there a strategy? Why do we need serializeUser and deserializeUser? Why does the session keep the user logged in? Why do we compare the password with bcrypt? These questions were all over my head at first.

But slowly I understood the flow:

- the user sends username and password
- passport checks the database for that user
- it compares the password using bcrypt
- if it matches, it gives the app the user
- then the session keeps that user logged in while they move through the app

Passport It's a system that connects login logic with the session. It is still confusing sometimes, but I understand the basic idea better now.

## database was also tricky

The database part was also very tricky, especially at the beginning. I had to think about tables, relations and db structure, query flow.
If the tables are not planned well, the app gets confusing very fast.

In this project, the structure was simple but important:

- users table stores user information
- posts table stores content and a reference to the user who created it
- user_id connects the post to the correct user

That helped me understand how relational data works. but still sql let's see how's ORM's gonna look next project.

## error messages took me some time

The error message part also took me a while to understand. At first I was not really sure where to store the messages, how to pass them from the controller to the page, and how to show them without breaking the flow of the app. It felt like one of those small things that seems easy, but actually needs a bit of thinking.

What I learned is that sessions are useful here because you can store the message, redirect, and then show it on the next page load. Until I know that passport messages are not the same as validation messages. It was also interesting to find out that there is another Express middleware called connect-flash, which does basically the same thing in a more built-in way. I taught it could help me to combine all err messages but it didn't so it was useless, idk if there is some other middleware that can do this.

made by [object Object].

## Acknowledgements

A special shoutout to [DiceBear](https://github.com/dicebear/dicebear)! Their fascinating project made it incredibly easy to provide users with random avatars and images seamlessly, without needing any JavaScript APIs.
