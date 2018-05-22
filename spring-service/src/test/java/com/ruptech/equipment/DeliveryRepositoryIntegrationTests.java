package com.ruptech.equipment;

import com.ruptech.equipment.entity.Delivery;
import com.ruptech.equipment.respository.DeliveryRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * Integration tests for {@link DeliveryRepository}.
 *
 * @author Oliver Gierke
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class DeliveryRepositoryIntegrationTests {

    @Autowired
    private DeliveryRepository repository;

    @Test
    public void findsFirstPageOfDeliveries() {
        String eid = "o";
        Page<Delivery> deliveries = this.repository.findAll(new Specification<Delivery>() {
            @Override
            public Predicate toPredicate(Root<Delivery> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> list = new ArrayList<Predicate>();
                if (!StringUtils.isEmpty(eid)) {
                    list.add(cb.equal(root.get("eid").as(String.class), eid));
                }

                Predicate[] p2 = new Predicate[list.size()];
                query.where(cb.and(list.toArray(p2)));
                return query.getRestriction();
            }
        }, PageRequest.of(0, 10, Sort.by(Sort.Order.desc("id"))));
        System.out.println(deliveries);
        //assertThat(deliveries.getTotalElements()).isGreaterThan(20L);
    }

}
