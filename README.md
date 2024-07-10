# ai-social-media-manager
Website that will upload all my social media content to all my different platforms with one click

like publer but for free, open source, and with the features a creator actually needs

ideas for the app: 

- create emails anc setup social accs for you
- upload an image or video with a caption and choose which platforms to post to with a single click
- user login info (somehow generate specific api creds with each individual user?)
- stretch: implement gpt api to generate content ideas from trends and user input


File Structure: 
my-social-media-manager/
├── backend/
│   ├── src/
│   │   ├── index.js          # Main server file
│   ├── uploads/              # Directory for storing uploaded files
│   ├── package.json          # NPM package file for backend
│   ├── .env                  # Environment variables for backend
│   └── node_modules/
├── frontend/
│   ├── public/
│   │   ├── index.html        # HTML template
│   ├── src/
│   │   ├── App.js            # Main React application file
│   │   ├── InstagramPoster.js# React component for handling uploads and posting
│   │   └── index.js          # Entry point for React app
│   ├── package.json          # NPM package file for frontend
│   └── node_modules/
└── .gitignore                # Specifies untracked files