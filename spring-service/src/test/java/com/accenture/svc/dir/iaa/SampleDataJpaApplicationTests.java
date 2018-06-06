package com.accenture.svc.dir.iaa;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.WebApplicationContext;

import java.lang.management.ManagementFactory;

import javax.management.ObjectName;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test to run the application.
 *
 * @author Oliver Gierke
 * @author Dave Syer
 */
@RunWith(SpringRunner.class)
@SpringBootTest
// Enable JMX so we can test the MBeans (you can't do this in a properties file)
@TestPropertySource(properties = {"spring.jmx.enabled:true",
        "spring.datasource.jmx-enabled:true"})
@ActiveProfiles("scratch")
// Separate profile for web tests to avoid clashing databases
public class SampleDataJpaApplicationTests {

    @Autowired
    private WebApplicationContext context;


    @Test
    public void testJmx() throws Exception {
        assertThat(ManagementFactory.getPlatformMBeanServer()
                .queryMBeans(new ObjectName("jpa.sample:type=HikariDataSource,*"), null))
                .hasSize(0);
    }

}