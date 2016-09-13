## Setting up the client

1. Go to the Instagram Developers page.
2. Log into your account or create a new one.
3. Go to “Manage clients”.
4. Click on the “Register a New Client” button.
5. Fill the form with random values that describe your app (“Instatags” could be a good start).
6. In the “Valid redirect URIs” field type `http://localhost:8080/utilities/get-token.html`.
7. Go to the security section and make sure that “Disable implicit Oauth option” is not checked.
8. Click on the “Register” button to create the client.
9. In the “Manage clients” section, find the client you just created and click on the “Manage” button.
10. Go to the “Sandbox” tab and add `instagrames` as a sandbox user. Then save the changes.

## Getting the access token

1. Run the project as described in the readme file.
2. Open a new tab in your browser on `http://localhost:8080/utilities/get-token.html`.
3. Fill the form with the client ID of the Instagram client you created.
4. Click on the “Authorize” button. Just follow the page instructions and authorize your own application.
5. Your access token will appear at the top of the page.
6. Copy and paste it as  `_token` value at the top of `lib/instagram.js`.

## Next steps

Compliments, you’ve just authorized your app to interact with the Instagram API. Now you’re ready to start the coding assignment!
