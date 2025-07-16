# ApadaRelief - A  collaboration platform for rescue agencies

### Main objective of this project is to enable efficient communication and collaboration between different rescue agencies and disaster relief NGOs during times of a calamity

#### Deployed website - [https://apadarelief.onrender.com](https://apadarelief.onrender.com/) 

### [**DEMO VIDEO**](https://youtu.be/lzg6qmesln8)

#### Features:
 
- Secure central database of all national, state and district level disaster relief agencies (NDRFs, SDRFs and DDRFs) and private NGOs, to store essential information such as location of the agency, contact information, teams and manpower, resources available (e.g. beds, tents, etc.)

- Map-based user interface for an agency to view and locate other agencies in the vicinity and view their available resources

- Simple quick interface (form) to send requests for resources to other agencies 

- Dashboard to view status of sent and received requests as well as approve or deny received requests

- Chatting system for agencies

-  ***SOS system for common users*** to send distress calls to agencies located within a particular radius with a click of a single button without logging in. Agencies can view count of distress calls received in the past 24 hours, as well as the location of the users, thus alerting the agencies in case of a crisis.

#### Technology used:
- Database: MongoDB Atlas with geospatial indexing
- Frontend: ReactJS, CSS and SCSS
- Mapping and reverse geocoding: [React Leaflet](https://react-leaflet.js.org/) and [Geocoding API](https://geocode.maps.co/)
- Backend: TypeScript, NodeJS and ExpressJS
- Fast real time communication: [socket.io](https://socket.io/)

#### Screenshots:

- Landing page: 

    ![Landing](./screenshots/landing.png)

- Signup page:

    ![Signup](./screenshots/signup.png)

- Map interface to view other agencies and request for collaboration: 

    ![Map interface](./screenshots/map_interface.png)

- Agency dashboard to view, accept or reject requests:

    ![Dashboard](./screenshots/dashboard.png)

- Sending an SOS call without logging in as a common user:

    ![SOS](./screenshots/sos.png)


### This project was built as a part of Smart India Hackathon 2023 and ***won the first prize*** for this problem statement among 7 finalist teams and 500 initial submissions from all over India. (PS Code: SIH1440)  

### Our team and primary responsibilities:
- Bhushan Jadhav - Leader Project Management, App design and frontend devlopment 
- Mohammed Saad Belgi - Backend development
- Sarthak Gharat - Backend development
- Janhavi Deshmukh - UI Design and Frontend Development
- Nikhil Prajapati - Frontend Development and mapping
- Atharva Bilonikar - Frontend Development


<!-- Restrictive License Crisis Avengers Team

This software is proprietary and confidential. No rights to view, distribute, or modify this software are granted to any party.

Unauthorized copying, distribution, or use of this software is strictly prohibited.

For inquiries regarding licensing options, please contact crisis.avengers@spit.ac.in -->
