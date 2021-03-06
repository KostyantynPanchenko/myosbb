package com.softserve.osbb.service.impl;

import com.softserve.osbb.model.Apartment;
import com.softserve.osbb.repository.ApartmentRepository;
import com.softserve.osbb.service.ApartmentService;
import com.softserve.osbb.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApartmentServiceImpl implements ApartmentService {
    @Autowired
    ApartmentRepository apartmentRepository;

    @Override
    public void saveApartment(Apartment apartment) {
        apartmentRepository.save(apartment);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public void saveApartmentList(List<Apartment> list) {
        apartmentRepository.save(list);
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    @Override
    public Apartment findOneApartmentByID(Integer id) {
        return apartmentRepository.findOne(id);
    }


    @Transactional(readOnly = true)
    @Override
    public List<Apartment> findAllApartment() {
        return apartmentRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteApartment(Apartment apartment) {

        apartmentRepository.delete(apartment);
    }

    @Transactional
    @Override
    public void deleteApartmentByID(Integer id) {

        apartmentRepository.delete(id);
    }

    @Transactional(readOnly = false)
    @Override
    public Apartment updateApartment(Apartment apartment) {
        return apartmentRepository.saveAndFlush(apartment);
    }


    @Transactional(readOnly = true)
    @Override
    public Page<Apartment> getAllApartment(Integer pageNumber, String sortBy, Boolean order, Integer number, Integer osbbId) {
        PageRequest pageRequest = new PageRequest(pageNumber - 1, Constants.DEF_ROWS,
                getSortingOrder(order), sortBy == null ? "number" : sortBy);
        return number != null ? apartmentRepository.findByNumber(pageRequest, number, osbbId) : apartmentRepository.findAllForUser(pageRequest, osbbId);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<Apartment> getAllApartmentsToAdmin(Integer pageNumber, String sortBy, Boolean order, Integer number) {
        PageRequest pageRequest = new PageRequest(pageNumber - 1, Constants.DEF_ROWS,
                getSortingOrder(order), sortBy == null ? "number" : sortBy);
        return number != null ? apartmentRepository.findByNumberToAdmin(pageRequest, number) : apartmentRepository.findAll(pageRequest);
    }


    public Sort.Direction getSortingOrder(Boolean order) {
        if (order == null) {
            return Sort.Direction.DESC;
        }
        return order == true ? Sort.Direction.ASC : Sort.Direction.DESC;
    }

}