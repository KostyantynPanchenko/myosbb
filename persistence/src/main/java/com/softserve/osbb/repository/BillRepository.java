package com.softserve.osbb.repository;

import com.softserve.osbb.model.Apartment;
import com.softserve.osbb.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by nataliia on 10.07.16.
 */
@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {


    @Query(value = "select * from bill where apartment_id IN (" +
            "SELECT a.apartment_id from apartment a " +
            "INNER JOIN users ON users.user_id = a.owner_id " +
            "where users.user_id=?1" +
            ")", nativeQuery = true)
    List<Bill> findAllByUserId(Integer userId);

    Page<Bill> findByApartment(Apartment apartment, Pageable pageable);

    @Query(value = "select * from bill where EXTRACT (year from \"date\")=:year",
            nativeQuery = true)
    List<Bill> getAllByYear(@Param("year") Integer year);


   // @Query("select b from Bill ")

    @Query(value = "select * from bill where DATE_PART('Year',date)=DATE_PART('Year',now()) " +
            "AND DATE_PART('Month',date)=DATE_PART('Month',now()) AND apartment_id=:apartmentId ", nativeQuery = true)
    List<Bill> getAllBillsByApartmentWithCurrentMonth(@Param("apartmentId")Integer apartmentId);

}
