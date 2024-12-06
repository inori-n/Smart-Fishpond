# Smart Fishpond System

The Smart Fishpond System is an IoT-based aquaculture monitoring platform designed to automate the monitoring of water quality, environment, and farming equipment. It aims to optimize the farming environment, enhance farming efficiency, and ensure healthy aquaculture operations. The system provides real-time monitoring data, alert functions, and operational management through both the Web and Mobile App platforms.

## Key Features

- **Real-time Monitoring**: Monitors water quality parameters such as water temperature, water depth, humidity and air temperature.
- **Intelligent Alerts**: Automatically generates alerts when parameters exceed predefined thresholds using big data analysis.
- **Environmental Data Analysis**: Analyzes environmental data collected by sensors through data mining and trend analysis.
- **Web and App Support**: Users can monitor fishpond data and control devices in real-time via the Web or Mobile App.

## Technology Stack

- **Frontend**: Vue.js, Element UI, Axios
- **Backend**: Spring Boot, MyBatis, Java 17
- **Database**: MySQL 8.0+
- **Hardware**: Raspberry Pi, temperature and humidity sensors, turbidity sensors, dissolved oxygen sensors, etc.
- **Data Transmission**: MQTT, HTTP
- **Mobile App**: React Native or Flutter (depending on the implementation)

## Features Overview

- **Water Quality Monitoring**: Real-time collection of sensor data to display the environmental conditions of the pond.
- **Automated Control**: Automatically adjusts devices such as water pumps and oxygen generators based on sensor data.
- **Data Display**: Graphical representation of water quality trends on the Web and App platforms.
- **Device Management**: Management and configuration of connected sensors and control devices.
- **Alert System**: Automated alerts when monitoring data exceeds predefined thresholds.

## Installation and Deployment

### Frontend

1. Clone the frontend repository:

    ```bash
    git clone https://github.com/yourusername/smart-fishpond-frontend.git
    cd smart-fishpond-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run serve
    ```

### Backend

1. Clone the backend repository:

    ```bash
    git clone https://github.com/yourusername/smart-fishpond-backend.git
    cd smart-fishpond-backend
    ```

2. Configure the database:
    - Create a new MySQL database (e.g., `fishpond_db`).
    - Modify the `application.properties` file to update the database connection settings.

3. Install dependencies:

    ```bash
    mvn install
    ```

4. Start the Spring Boot project:

    ```bash
    mvn spring-boot:run
    ```

### Mobile App

Use React Native or Flutter for mobile development, clone the respective repository, install dependencies, and build the app.

## Project Structure

├── backend │ ├── src │ ├── pom.xml │ └── application.properties ├── frontend │ ├── src │ ├── public │ └──package.json └── app ├── src ├── assets └── app.json

## Contributing

1. **Fork** the repository.
2. Create a new branch `feature/your-feature`.
3. Commit your changes and push them to your branch.
4. Create a Pull Request to submit your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Frequently Asked Questions

**Q**: How can I view real-time data?  

**A**: You can view real-time data on both the Web platform and the App. Go to the real-time data page to check various parameters.

**Q**: How do I add a new device? 

**A**: Go to the device management page, where you can add a new device by inputting its type and connection information.

———

---

> **Note**: This project is open-source. We welcome contributions from developers, suggestions, and bug reports. We encourage the community to improve the project and enhance aquaculture efficiency.