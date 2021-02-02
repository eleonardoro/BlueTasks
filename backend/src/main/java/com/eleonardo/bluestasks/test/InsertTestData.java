package com.eleonardo.bluestasks.test;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.eleonardo.bluestasks.domain.task.Task;
import com.eleonardo.bluestasks.domain.task.TaskRepository;
import com.eleonardo.bluestasks.domain.user.AppUser;
import com.eleonardo.bluestasks.domain.user.AppUserRepository;

@Component
public class InsertTestData {

	private TaskRepository taskRepository;
	private AppUserRepository appUserRepository;
	
	@Autowired
	public InsertTestData(TaskRepository taskRepository, AppUserRepository appUserRepository) {
		super();
		this.taskRepository = taskRepository;
		this.appUserRepository = appUserRepository;
	}

	@EventListener
	public void onApplicationEvent(ContextRefreshedEvent event) {
		PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		
		AppUser appUser = new AppUser("john", encoder.encode("abc"), "John Coder");
		appUserRepository.save(appUser);
		
		AppUser appUser2 = new AppUser("paul", encoder.encode("cba"), "Paul JDev");
		appUserRepository.save(appUser2);
		
		LocalDate baseDate = LocalDate.parse("2025-02-01");
		
		for(int i = 0; i <= 5; i++) {
			Task task = new Task("Tarefa #" + i + " do usuário " + appUser.getDisplayName(), baseDate.plusDays(i), false);
			task.setAppUser(appUser);
			taskRepository.save(task);
		}
		
		for(int i = 0; i <= 5; i++) {
			Task task = new Task("Tarefa #" + i + " do usuário " + appUser2.getDisplayName(), baseDate.plusDays(i), false);
			task.setAppUser(appUser2);
			taskRepository.save(task);
		}
	}
	
}
