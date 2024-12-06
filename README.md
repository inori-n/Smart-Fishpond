# Smart-Fishpond

# 智慧鱼塘系统

智慧鱼塘系统是一款结合物联网技术和智能控制系统的水产养殖监控平台，旨在通过自动化监控水质、环境以及养殖设备，实现精准养殖，优化养殖环境，提高养殖效率。该系统通过Web端和App端为用户提供实时监控数据、预警功能和操作管理，确保养殖环境健康、稳定。

## 项目特点

- **实时监控**：监控水温、pH值、溶解氧、浑浊度等水质参数。
- **智能预警**：通过设定阈值和大数据分析，自动报警处理异常情况。
- **环境数据分析**：结合传感器采集的环境数据，通过数据挖掘技术进行趋势分析。
- **Web端和App端支持**：用户可以通过Web端或App端实时查看养殖池数据，并进行设备控制。

## 技术栈

- **前端**：Vue.js、Element UI、Axios
- **后端**：Spring Boot、MyBatis、Java 17
- **数据库**：MySQL 8.0+
- **硬件**：树莓派、温湿度传感器、浑浊度传感器、溶解氧传感器等
- **数据传输**：MQTT协议、HTTP
- **App端**：React Native 或 Flutter（视具体实现）

## 功能概览

- **水质监控**：通过实时采集传感器数据展示水池的环境状况。
- **自动控制**：根据传感器数据自动调节设备，如水泵、加氧机等。
- **数据展示**：在Web端和App端显示数据图表，用户可以查看水质变化趋势。
- **设备管理**：管理与配置连接的传感器和控制设备。
- **报警系统**：当监测数据超过预设范围时，系统会自动发出警报。

## 安装与部署

### 前端

1. 克隆前端项目：

    ```bash
    git clone https://github.com/yourusername/smart-fishpond-frontend.git
    cd smart-fishpond-frontend
    ```

2. 安装依赖：

    ```bash
    npm install
    ```

3. 启动开发服务器：

    ```bash
    npm run serve
    ```

### 后端

1. 克隆后端项目：

    ```bash
    git clone https://github.com/yourusername/smart-fishpond-backend.git
    cd smart-fishpond-backend
    ```

2. 配置数据库：
    - 创建一个新的MySQL数据库，例如 `fishpond_db`。
    - 修改 `application.properties` 文件中的数据库连接配置。

3. 安装依赖：

    ```bash
    mvn install
    ```

4. 启动Spring Boot项目：

    ```bash
    mvn spring-boot:run
    ```

### App端

1. 使用React Native或Flutter进行开发，克隆相应的代码仓库，安装依赖并进行构建。

## 项目结构

├── backend │ ├── src │ ├── pom.xml │ └── application.properties ├── frontend │ ├── src │ ├── public │ └── package.json └── app ├── src ├── assets └── app.json

## 贡献

1. **Fork** 该仓库。
2. 创建一个新的分支 `feature/your-feature`。
3. 提交您的更改并推送到您的分支。
4. 创建一个 Pull Request 提交您的更改。

## 许可证

本项目使用 MIT 许可证。详细信息请参见 [LICENSE](LICENSE) 文件。

## 常见问题

**Q**: 如何查看实时数据？  
**A**: 通过Web端或App端进入实时数据页面，查看各项参数的实时数据。

**Q**: 我如何添加新的设备？  
**A**: 在设备管理页面添加新的设备，输入设备类型和连接信息。

---

> **注意**：本项目是一个开源项目，欢迎开发者贡献代码、提建议或报告bug。我们鼓励社区共同改进项目，提升养殖效率。
