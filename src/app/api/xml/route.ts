export async function GET() {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
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
</soap:Envelope>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
