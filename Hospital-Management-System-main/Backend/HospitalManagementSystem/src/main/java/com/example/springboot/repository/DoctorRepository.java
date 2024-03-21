package com.example.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot.model.Doctor;
import com.example.springboot.model.Patient;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
	
	Optional<Doctor> findByDoctorEmailIdAndDoctorPassword(String emailId,String password);
	List<Patient> findPatientByDoctorId(long doctorId);
	Optional<Doctor> findByDoctorEmailId(String doctorEmailId);
}
