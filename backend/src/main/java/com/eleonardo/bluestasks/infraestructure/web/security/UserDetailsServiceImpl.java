package com.eleonardo.bluestasks.infraestructure.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eleonardo.bluestasks.domain.user.AppUser;
import com.eleonardo.bluestasks.domain.user.AppUserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private AppUserRepository appUserRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = appUserRepository.findByUsername(username);

		if (appUser == null) {
			throw new UsernameNotFoundException(username);
		}

		return new UserDetailsImpl(appUser);
	}

}
