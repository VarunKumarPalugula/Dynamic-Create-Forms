import { LawofficeApplicantModule } from '@app/lawoffice-applicant/lawoffice-applicant.module';

describe('LawofficeApplicantModule', () => {
  let lawofficeApplicantModule: LawofficeApplicantModule;

  beforeEach(() => {
    lawofficeApplicantModule = new LawofficeApplicantModule();
  });

  it('should create an instance', () => {
    expect(lawofficeApplicantModule).toBeTruthy();
  });
});
