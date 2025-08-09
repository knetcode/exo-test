# OBJECTIVES

## Data Capture

**Capture the following personal information from users:**

- [ ] First Name
- [ ] Surname
- [ ] ID Number
- [ ] Date of Birth (auto-derived from the ID Number)
- [ ] Occupation options. (Dropdown with min 20 options)

## Data Privacy

Implement obscuring/masking of sensitive personal information in the UI to protect
user privacy.

## PDF Handling

- [ ] Enable users to upload documents (e.g., PDFs).
- [ ] Provide an interactive preview/display of uploaded PDFs within the application.

## XML Data Handling

- [ ] Parse and display structured XML data provided in a sample dataset.
- [ ] The XML node descriptions should be displayed as table headers, and the corresponding data should be dynamically rendered in the UI.

## System Requirements

- The application should offer seamless navigation between different pages and components.
- Ensure the application is mobile-responsive and optimized for a variety of screen sizes.
- A README file is optional but encouraged for clarity and ease of use.

## Data Storage & Environment

- Data may be stored in in-memory objects or local files.
- If a Dockerized database environment is preferred:
  - Provide a clearly defined database schema.
  - Include the necessary Docker configuration files to support the setup and usage of the database.

## XML Data Example

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <GetArchiveReportDetailResponse xmlns="http://test.com/">
      <GetArchiveReportDetailResult>
        <modules xmlns="">
          <module code="GR" description="Credit Individual Enquiry">
            <segment code="GR_HI" name="Header Information">
              <item>
                <node name="Full Name">Christopher Jones Bar</node>
              </item>
            </segment>
          </module>
          <module code="EMP_GR" description="GR Employment Verification">
            <segment code="GR_HI" name="Header Information">
              <item>
                <node name="Full Name">Christopher Jones Bar</node>
                <node name="Identification Number">7707077777087</node>
              </item>
            </segment>
          </module>
          <module code="CPU_CCA" description="CPA Individual Enquiry">
            <segment code="CPU_CC" name="Summary Payment Profile">
              <item>
                <node name="Total Active Accounts">0</node>
                <node name="Closed Accounts">0</node>
                <node name="Adverse Accounts">0</node>
                <node name="Highest Months In Arrears">0</node>
              </item>
            </segment>
          </module>
          <module code="GR_DeedOnFile" description="GR Deeds on File"></module>
          <module code="PURQ_QVS" description="Qualification Verification (PURQ)"></module>
          <result>
            <sessionid></sessionid>
            <enquiryid>14a5ab12-3fed-4ac3-924e-aa0c117167b5</enquiryid>
          </result>
        </modules>
      </GetArchiveReportDetailResult>
    </GetArchiveReportDetailResponse>
  </soap:Body>
</soap:Envelope>
```
