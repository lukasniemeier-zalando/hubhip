# hubhip

This project translates webhook calls of Github's pre-built (and outdated) [Hipchat integration](https://github.com/github/github-services/blob/master/docs/hipchat) to Hipchat's [room notification API](https://hipchat.zalando.net/docs/apiv2/method/send_room_notification).

## running

Assuming you have _npm_ and _nodejs_ installed the application should just start.

    $ npm install
    $ node index.js

If you actually want to use this, you should configure some environment variables before running.

| Variable      | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| PORT          | Listen port of the application (defaults to _5000_)                      |
| HIPCHAT_HOST  | Hipchat server to be called (defaults to _https://hipchat.zalando.net_)  |

## deploying

There is everything in place to deploy this as a Heroku application.
