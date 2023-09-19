# **Save Right** - Budgeting and Financial Literacy
This project was originally created for Shellhacks 2023.

The Developers
-
This Full Stack Project was created by [**Nicholas Donahue**](https://www.linkedin.com/in/nicholasdonahue/) and [**Joshua Lopes**](https://www.linkedin.com/in/joshua-lopes-aaab05188/) from **Florida International University**.


# Our Product


## **Inspiration**
Our inspiration for this app stemmed from our own experiences as college students. Navigating the initial struggle of financial responsibilities for the first time, we felt the weight of every expenditure and the anxiety of potentially making uninformed decisions. We realized that many of our peers shared this struggle, facing the daunting challenge of budgeting with limited guidance. This app is our response to that collective need, aiming to equip students with the tools and insights to manage their finances confidently.

## **What it does**
Our app serves as a comprehensive financial hub for users, enabling them to diligently monitor both their expenses and income. Recognizing the diverse needs and financial goals of college students, the app is flexible, allowing the setup of various budget types tailored to specific categories. For an intuitive understanding of their spending habits, users can access a detailed transaction table. This visually-organized feature not only displays all transactions but also classifies them into categories, providing a clear breakdown of where their money is being allocated. This empowers students to make informed financial decisions and ensures transparency in their personal finance journey.

## **How we built it**
Our journey to develop the app began with conceptualizing an intuitive frontend design on Figma, which gave us a clear vision of the user experience we wanted to deliver. Parallelly, we crafted detailed UML diagrams to methodically plan and structure our backend architecture. To ensure seamless and efficient communication between the frontend and backend, we leveraged the Django Rest Framework for our server-side operations, while employing React.js for the dynamic frontend development.

Prioritizing user security, we engineered a custom authorization mechanism, safeguarding our endpoints from potential breaches. This system not only protects user data but also ensures that the corresponding data is strictly accessible to the rightful user. On the frontend, we strategically store the authorization token locally, which acts as a gatekeeper, preventing unauthorized access to sensitive pages

## **Challenges we ran into**
One significant hurdle we encountered was integrating Django's default authorization system. While powerful, certain inherent features didn't align seamlessly with our app's workflow and functionality requirements. This misalignment prompted us to rethink our approach. Rather than adapting our vision to fit within Django's constraints, we opted for innovation. We crafted our own bespoke authorization mechanism, centered around a custom wrapper class. This class meticulously verifies users based on their bearer token at every single endpoint, ensuring robust security tailored to our app's unique operational flow.

## **Accomplishments that we're proud of**
We take immense pride in the dedication and synergy that drove this project forward. Despite being a duo, our journey was marked by moments of self-doubt and the weight of the task ahead. However, resilience prevailed, allowing us to bring our vision to life. What amplifies our sense of accomplishment is the myriad of skills and insights we gained along the way. Tackling a full-stack application for the first time was no small feat, yet the experience enriched our understanding of development intricacies, reaffirming our passion and determination in the realm of tech.

## **What's next for Save Right**
We are planning to expand to the app to have a more graphic representation of the user's data. We planned on having dynamic pie charts which would display different comparison and metrics of the user's transactions.
