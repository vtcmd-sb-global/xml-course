import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '@site/src/components/Layout/Layout';
import Homepage from '@site/src/components/Homepage/home';

export default function Home() {
  return (
    <Layout
      title="XML and JSON Validation Course"
      description="XML, XSLT & JSON Course from Beginner to Advanced">
      <CustomLayout>
        <Homepage />
      </CustomLayout>
    </Layout>
  );
}
