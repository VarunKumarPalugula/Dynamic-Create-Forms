import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationGuard, AuthenticationService, MockAuthenticationService } from '@app/core';
import { ShellComponent } from '@app/shell/shell.component';
import { Shell } from '@app/shell/shell.service';

describe('Shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellComponent],
      providers: [AuthenticationGuard, { provide: AuthenticationService, useClass: MockAuthenticationService }],
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Shell.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
