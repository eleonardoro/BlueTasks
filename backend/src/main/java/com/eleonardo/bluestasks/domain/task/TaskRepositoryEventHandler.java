package com.eleonardo.bluestasks.domain.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Task.class)
public class TaskRepositoryEventHandler {

	@Autowired
	private TaskRepository taskRepository;

	@HandleBeforeSave
	@HandleBeforeCreate
	public void handle(Task task) throws DuplicateTaskException{
		Task taskDb = taskRepository.findByDescription( task.getDescription());
		boolean duplicate = false;
		
		if(taskDb != null) {
			if((task.getId() == null || task.getId() == 0) && task.getDescription().equals(taskDb.getDescription())) {
				duplicate = true;
			}
			
			if(task.getId() != null && task.getId() > 0 && !task.getId().equals(taskDb.getId())) {
				duplicate = true;
			}
		}
		
		if(duplicate)
			throw new DuplicateTaskException("Já existe uma tarefa com essa descrição!");
	}

}
