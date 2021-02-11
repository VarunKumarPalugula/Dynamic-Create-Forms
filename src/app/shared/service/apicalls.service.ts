import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { UrlConfig } from '@app/enums/urls-enum';

@Injectable({
  providedIn: 'root',
})
export class ApicallsService {
  //code api's for test from git
  public domain1: string = 'http://my-json-server.typicode.com/';
  public api1: string = this.domain1 + 'techsithgit/json-faker-directory/profiles';

  //Http Generic Headers for everyone

  public headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  //http headers for admin
  public Authorizationheadersforadmin: HttpHeaders = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('A_AccessToken')
  );

  //http heders for user
  public Authorizationheadersforuser: HttpHeaders = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + sessionStorage.getItem('U_AccessToken')
  );

  //Stings For Admin Api's
  //public domain: string = "http://localhost:64957/";//1
  public domain: string = UrlConfig.DOMIN;

  public AdminRegister: string = this.domain + 'api/OrgAdmin/Register'; //2
  public CheckAdminOrganisation: string = this.domain + 'api/admin/CheckAdminOrganisation'; //2
  public CheckAdminOrganisationEmailExistency: string = this.domain + 'api/admin/CheckAdminOrganisationEmailExistency';
  public CheckAdminUsernameExistency: string = this.domain + 'api/admin/CheckAdminUsernameExistency';
  public Logdata: string = this.domain + 'api/OrgAdmin/Logdata';
  public AdminApiGeneration: string = this.domain + 'api/tokengen'; //3
  public SetTempPassword: string = this.domain + 'SecurityResets/SetTempPassword'; //4
  public SetActualPassword: string = this.domain + 'SecurityResets/SetActualPassword'; //
  public GetAdminClaimsData: string = this.domain + 'api/getadminclaims'; //5
  // tslint:disable-next-line:max-line-length
  public GetAdminOrganisationsAssociatedList: string = this.domain + 'api/Access/GetAdminOrganisationsAssociatedList'; //6
  public GetRoleAndPermissionsOfAdmin: string = this.domain + 'api/Admin/GetRoleAndPermissionsOfAdmin'; //6
  public SendTempPassword: string = this.domain + 'SecurityResets/SetTempPassword'; //7
  public verifyEmail: string = this.domain + 'admin/verify'; //8
  public resendemailverficationlink = this.domain + 'api/admin/resendemailverficationlink';
  public StoringOrgId: string = this.domain + 'api/Access/UpdateTheOrgId'; //9
  public Activies: string = this.domain + 'api/Dashboard/Activities';
  public EditActivies: string = this.domain + 'api/Dashboard/ActivitiesEdits';
  public invitetem: string = this.domain + 'api/Admin/TeamInvite'; //10
  public TeamInviteesList: string = this.domain + 'api/Admin/TeamInvitesList'; //11
  public TeamJoiningClearance: string = this.domain + 'Admin/TeamJoiningClearence'; //12
  public unregisteredadminjoin: string = this.domain + 'Admin/TeamJoiningUnRegistered'; //13
  public ApiGetTeamList: string = this.domain + 'api/Admin/TeamMemsList'; //14
  public ResendInvitation: string = this.domain + 'api/Admin/UpdateInvitee'; //15
  public RenderingRoles: string = this.domain + 'api/Admin/GetThePrimaryAndSecondayAdminsData'; //16
  public MakeTeamMemberInActive: string = this.domain + 'api/Admin/MakeTeamMemberInActive'; //15
  public MakeTeamMemberActive: string = this.domain + 'api/Admin/MakeTeamMemberActive'; //16
  public adminCheckEmailExistency: string = this.domain + 'api/Admin/CheckEmailExistency';

  // adminclient
  public clientInvitation: string = this.domain + 'api/Admin/ClientsInvitation';
  public adminClientsList: string = this.domain + 'api/Admin/GetClientsList';
  public SendClientTempPassword: string = this.domain + 'SecurityResets/SetTempPassword';
  public importCSV: string = this.domain + 'api/OrgAdmin/ClientManagement';
  public getCSVData: string = this.domain + 'api/OrgAdmin/clientdata';
  public clientOrgExistancy: string = this.domain + 'api/client/CheckAdminOrganisation';
  public clientEmailExistancy: string = this.domain + 'api/client/CheckAdminOrganisationEmailExistency';
  public CheckEmailExistency: string = this.domain + 'api/client/CheckEmailExistency';
  public clientregistration: string = this.domain + 'api/ClientAdmin/Register';
  public clientClaimData: string = this.domain + 'api/getclientadminclaims';
  public adminclientinvite: string = this.domain + 'api/Admin/ClientOrganisationInvitation'; //17
  public adminmutipleclientinvite: string = this.domain + 'api/OrgAdmin/ClientManagement';
  public MultipleClientData: string = this.domain + 'api/OrgAdmin/clientdata';
  public ApiGetClientList: string = this.domain + 'api/Admin/GetClientsList'; //18
  public clientinviteeslist: string = this.domain + 'api/Admin/GetClientsInviteesList'; //19
  public gettingIncomingClientList: string = this.domain + 'api/Admin/GetIncomingClientList';
  public ClientManaegement: string = this.domain + 'api/OrgAdmin/ClientManagement';
  public AdminClientResendInvitation: string = this.domain + 'api/Admin/ResendClientOrganisationInvitation'; //20
  public unregisteredadminclientjoin: string = this.domain + 'Admin/ClientOrganisationSetUpByLawofficeOrgLink'; //21
  public AdminClientJoiningClearance: string = this.domain + 'Admin/ClientOrganisationAdd'; //22
  public GetAllClientsbyOrgID: string = this.domain + 'api/Admin/GetClientsData'; //23
  public TasksDone: string = this.domain + 'api/admin/TasksDone';
  public GetAllApplicantsbyOrgID: string = this.domain + 'api/Admin/GetTeamMembersInClientOrgID'; //24
  public MakeClientInActive: string = this.domain + 'api/Admin/MakeClientInActive'; //15
  public MakeClientActive: string = this.domain + 'api/Admin/MakeClientActive'; //16
  public SetClientActualPassword: string = this.domain + 'SecurityResets/ClientAdmin/SetActualPassword';

  //Filings
  public approveFiling = this.domain + 'api/Admin/ActivateClientInitiatedFiling';
  public CreateFiling = this.domain + 'api/Admin/AddFilings'; //25
  // public GetFilings: string = this.domain + 'api/Admin/GetFilings'; //26
  public GetFillingClientMemebers = this.domain + 'api/admin/GetFilingsClientTeam'; //27
  public GetFillingTeamMemebers = this.domain + 'api/admin/GetFilingsTeam'; //28

  //api for uploading the files
  public GoogleDriveAuth = this.domain + 'api/GoogleDrive/login';
  public DropboxAuth = this.domain + 'api/Dropbox/Login';
  public DropboxFiles = this.domain + 'api/Dropbox/All';
  public DropboxFilesDownload = this.domain + 'api/Dropbox/Download';
  public GoogleFileDownload = this.domain + 'api/GoogleDrive/Download';
  public GoogleSignout = this.domain + 'api/GoogleDrive/Signout';
  public UploadFiles = this.domain + 'api/admin/filesupload';
  public DeleteFiles = this.domain + 'api/admin/deletefiles';
  public DeleteFolder = this.domain + 'api/admin/deletefolder';
  public ViewFiles = this.domain + 'api/admin/Viewfiles';
  public FetechingFiles = this.domain + 'api/admin/listoffilesforfiling';
  public FetechingFilesByCaseId = this.domain + 'api/admin/listoffilesforfiling';
  public FetechingFolder = this.domain + 'api/admin/listoffolderforfiling';
  public FetechingFilesundernewFolder = this.domain + 'api/admin/listoffilesunderNewfolder';
  public UploadedFileViewPermission = this.domain + 'api/admin/UploadedFileViewPermission';
  public clientUploadedFileViewPermission = this.domain + 'api/client/UploadedFileViewPermission';
  public CreateNewFolder = this.domain + 'api/admin/file/foldercreation';
  public ListOfFolders = this.domain + 'api/admin/listoffolders';
  public DownloadingFiles = this.domain + 'api/admin/file/download';
  public FolderFiles = this.domain + 'api/admin/listoffilesinfolders';
  public FolderFileupload = this.domain + 'api/admin/folder/filesupload';

  // api for Messages
  FetechTopics = this.domain + 'api/admin/GetTopicsForFilings';
  public PostTopics = this.domain + 'api/admin/CreateTopicForTaskSubtask';
  public PostTopicsfoFiling = this.domain + 'api/admin/CreateTopicForFiling';
  public Topicarchive = this.domain + 'api/admin/filing/topicarchive';
  public Groupmessagearchive = this.domain + 'api/admin/filing/groupmessagearchive';
  public Groupsubmessagearchive = this.domain + 'api/admin/filing/groupsubmessagearchive';

  //public CreateSubTaskinGroupTask=this.domain+"api/admin/CreateTopicForSubTask";
  public FetechTopicsCheckTopicList = this.domain + 'api/admin/GetTopicsForCheckingTopicList';
  public GetTopicTeamMember = this.domain + 'api/admin/GetTopicTeam'; //28
  public GetTopicsForFilings = this.domain + 'api/admin/GetTopicsForFilings';
  public CreateTopicForFiling = this.domain + 'api/admin/CreateTopicForFiling';

  //api for members section
  public ClientTmembersData = this.domain + 'api/admin/GetClientTeammembers';
  public OrgTmembersData = this.domain + 'api/Admin/OrgTeamMember';
  public AddClientteam = this.domain + 'api/admin/AddClientteamToFilingClient';
  public RemoveFilingClientMember = this.domain + 'api/admin/RemoveFilingClientTeamMember';
  public AddOrgTeam = this.domain + 'api/admin/AddOrgTeamtoTeamMembers';
  public RemoveFilingTeamMember = this.domain + 'api/admin/RemoveFilingTeamMember';

  //api's for Team Members

  public GetTeamMemberFilingsPermissions = this.domain + 'api/Admin/GetTeamMemberFilingPermissions';
  public SetTeamMemberFilingsPermissions = this.domain + 'api/Admin/SetTeamMemberFilingPermissions';

  //api's for Tasks

  public ChangeNotificatioFlag = this.domain + 'api/admin/TaskGroupsNotificationHide';
  public GetTaskGroupsList = this.domain + 'api/admin/GetListOfTaskGroups';
  public CreateGroupTask = this.domain + 'api/admin/AddTaskGroup';
  public GetTaskList = this.domain + 'api/admin/GetListofTaskInTaskGroup';
  public CreateTaskInGroupTask = this.domain + 'api/admin/AddTaskInTaskGroup';
  public CreateSubtaskInTask = this.domain + 'api/admin/AddSubtaskInTask';
  public GetSubtaskList = this.domain + 'api/admin/GetListofSubTaskInTasks';
  public GetMarkSubtaskCount = this.domain + 'api/admin/GetCountofMarkSubtask';
  public CheckExistancyForSubtask = this.domain + 'api/admin/CheckSubtaskExistancy';
  // public DeleteTaskGroup = this.domain + 'api/admin/DeleteTaskGroup';
  public DeleteTask = this.domain + 'api/admin/DeleteTaskfromTaskGroup';
  public DeleteSubtask = this.domain + 'api/admin/DeleteSubtask';
  public MarkasTaskComplete = this.domain + 'api/admin/MakeTaskComplete';
  public MarkasSubtaskComplete = this.domain + 'api/admin/MakeSubTaskComplete';
  public EditTask = this.domain + 'api/admin/EditTaskInTaskGroup';
  public EditSubTask = this.domain + 'api/admin/EditSubtaskInTask';
  public GetCompleteFillingTeamMemebers = this.domain + 'api/admin/GetCompleteFilingTeam'; //28
  //Overview
  public GetFilingClientdata = this.domain + 'api/admin/GetFilingsClientData';
  public GetTasksSummary = this.domain + 'api/admin/GetTaskSummary';
  public GetRemaingTaskList = this.domain + 'api/admin/GetRemainingTask';
  public GetlatestActivity = this.domain + 'api/admin/Activityinfo';
  public GetTrackingInfo = this.domain + 'api/ShippingTracking/ShippingDetails';
  public GetApplicant = this.domain + 'api/admin/GetApplicantDetail';
  public GetSponser = this.domain + 'api/admin/GetSponserDetail';
  public GetActivityinfo = this.domain + 'api/admin/Activityinfo  ';
  public GetNote = this.domain + 'api/admin/GetListOfNotes';
  public AddNote = this.domain + 'api/admin/AddNote';
  public EditNote = this.domain + 'api/admin/EditNotes';
  public StoreFilingDetails = this.domain + 'api/admin/StoreFilingDetails';
  public GetFilingDetails = this.domain + 'api/admin/GetFilingDetails';
  public EditFilingDetails = this.domain + 'api/admin/EditFilingDetails';
  public GetRelatedFilingDetails = this.domain + 'api/admin/ApplicantRelatedFilings';
  public GetShipmentTrackingList = this.domain + 'api/admin/GetShipmentTrackingList';
  public ShipMentTrackingNumber = this.domain + 'api/admin/ShipMentTrackingNumber';
  public deleteshipmenttrackingnumber = this.domain + 'api/admin/deleteshipmenttrackingnumber';
  public AdminUpComingTasks = this.domain + 'api/admin/AdminUpComingTasks';
  public TaskSummary = this.domain + 'api/admin/TaskSummary';
  public Relatedfillings = this.domain + 'api/admin/applicantreleatedfilings';

  // api for quick actions
  public AddRecieptNumber = this.domain + 'api/quickactions/AddReceiptNumber';
  public AddLcaNumber = this.domain + 'api/quickactions/AddLCANumber';
  public AddShipment = this.domain + 'api/admin/ShipMentTrackingNumber';

  // Case
  //public FetechingForm = this.domain + 'api/monitor/GetFilingForms';
  public FetechingForm = this.domain + 'api/GetForms';

  public FetchingFormsFiling = this.domain + 'api/admin/case/GetForms';
  public AddingToForms = this.domain + 'api/admin/case/AddForms';
  public DownloadPDF = this.domain + 'api/admin/DownloadPDF';
  public StoreForm = this.domain + 'api/admin/StoreForms';
  public DownlodingPDFfile = this.domain + 'api/admin/DownloadingPDf';
  public DownloadingFile = this.domain + 'api/admin/DownloadFile';
  // Supporting files section
  public GetFilesInSupportingFilesSection = this.domain + 'api/admin/case/GetFilesInSupportingFilesSection';
  public GetFoldersInSupportingFilesSection = this.domain + 'api/admin/case/GetFoldersInSupportingFilesSection';
  public AddFilesAndFoldersToSupportingFilesSection =
    this.domain + 'api/admin/case/AddFilesAndFoldersToSupportingFilesSection';
  public AddBlockUnblockTeamMemberToFilingClientTeam =
    this.domain + 'api/client/AddBlockUnblockTeamMemberToFilingClientTeam';
  //Client Admin Apis
  //make client teammember Inactive
  public MakeClientTeamMemberInActive: string = this.domain + 'api/client/MakeTeamMemberInActive';
  public MakeClientTeamMemberActive: string = this.domain + 'api/client/MakeTeamMemberActive';
  public verifyClientAdminEmail: string = this.domain + 'client/emailverify/'; //2
  public resendclientemailverficationlink = this.domain + 'admin/resendclientemailverficationlink';
  public ClientAdminApiGeneration: string = this.domain + 'api/tokengen'; //3
  public GetClientAdminClaimsData: string = this.domain + 'api/getclientadminclaims'; //4
  public ClientSendTempPassword: string = this.domain + 'api/SecurityResets/SetTempPassword'; //5
  public GetClientAdminOrganisationsAssociatedList: string =
    this.domain + 'api/clientadmin/Access/GetAdminOrganisationsAssociatedList'; //6
  public ClientAdminStoringOrgId: string = this.domain + 'api/ClientAdminAccess/UpdateTheOrgId'; //6
  public Clientteaminviteeslist: string = this.domain + 'api/client/TeamInvitesList'; //7
  public ApiGetClientTeamList: string = this.domain + 'api/client/TeamMemsList'; //14
  public clientinvitetem: string = this.domain + 'api/Client/TeamInvite'; //8
  public unregisteredclientjoin: string = this.domain + 'client/TeamJoiningUnRegistered'; //13
  public ClientTeamJoiningClearance: string = this.domain + 'client/TeamJoiningClearence'; //12
  public G28FilliOut: string = this.domain + 'api/g28FilliOut';
  public G28viewforfiling: string = this.domain + 'api/g28viewforfiling';
  public Getg28filingdataonthebasisoffilindid: string =
    this.domain + 'api/barcode/getg28filingdataonthebasisoffilindid';
  public Geti129filingdataonthebasisoffilindid: string = this.domain + 'api/getgi29filingdataonthebasisoffilindid';
  public i129FilliOut: string = this.domain + 'api/i129FilliOut';
  public I129viewforfiling: string = this.domain + 'api/i29viewforfiling';

  //admin connection exist or not
  public AddingConnectionToAdminAndClient: string = this.domain + 'api/client/AddingConnectionToAdminAndClient';
  //Applicant Api Urls
  public IndividualApplicantRegister = this.domain + 'api/Client/IndividualApplicantRegister';

  // Client Organization API URL's
  public clientTeamMemberSingup = this.domain + 'api/client/TeamJoiningUnRegistered';
  public clientAdminTeamResendDelete = this.domain + 'api/client/UpdateInvitee';
  public clientAdminAccesspanelData = this.domain + 'api/clientadmin/Access/GetAdminOrganisationsAssociatedList';
  public clientOrgTeamInvite = this.domain + 'api/Client/TeamInvite';
  public clientOrgInvitedTeamList = this.domain + 'api/client/TeamInvitesList';
  public clientTeamList = this.domain + 'api/client/TeamMemsList';

  // client side settings component Organisation Details client
  public getOrganisationInfo: string = this.domain + 'api/client/getOrganisationInfo';
  public OrganisationInfo: string = this.domain + 'api/client/OrganisationInfo';

  public financialsInfo: string = this.domain + 'api/client/FinancialInformation';
  public getFinancialInfo: string = this.domain + 'api/client/getFinancialInformation';

  public pocInformation: string = this.domain + 'api/client/poc';
  public getPocinformation: string = this.domain + 'api/client/getpoc';

  public authSignatoryInfo: string = this.domain + 'api/client/AuthorizedSignatory';
  public getauthSigntotaryInfo: string = this.domain + 'api/client/getAuthorizedSignatory';

  // applicant Side api's
  public immigrationDetails: string = this.domain + 'api/client/ApplicantImmigrationDetails';
  public getImmigrationDetails: string = this.domain + 'api/client/GetApplicantImmigrationDetails';
  //Common Apis
  public GetClientRoles = this.domain + 'api/monitor/GetClientRoles';
  public GetRoleAndPermissionsOfClient: string = this.domain + 'api/client/GetRoleAndPermissionsOfAdmin'; //6
  public IndividalBusineesApplicantAndSponsererDefaultPermissions: string =
    this.domain + 'api/client/IndividalBusineesApplicantAndSponsererDefaultPermissions'; //6

  //clientjoiningifexist
  public ClientJoiningAsPerUserExistency = this.domain + 'api/Admin/ClientJoiningAsPerUserExistency';
  public ClientSetUpByLawofficeOrgLink = this.domain + 'api/Admin/ClientSetUpByLawofficeOrgLink';

  //new fillings api
  public GetFiledFilings = this.domain + 'api/Admin/GetFiledFilings';
  public AddFilingWithOrganisationalSponserShip = this.domain + 'api/Admin/AddFilingWithOrganisationalSponserShip';
  public AddFilingWithGuardianOrOtherIndividualSponsership =
    this.domain + 'api/Admin/AddFilingWithGuardianOrOtherIndividualSponsership';
  public AddFilingWithApplicantAsSponserShip = this.domain + 'api/Admin/AddFilingWithApplicantAsSponserShip';
  public GetSponserShipTypes = this.domain + 'api/monitor/GetSponserShipTypes';
  public GetFilings = this.domain + 'api/monitor/GetFilings';
  public GetFilingAdminTeammembers = this.domain + 'api/Admin/GetFilingAdminTeammembers';
  public GetFilingClientTeammembers = this.domain + 'api/Admin/GetFilingClientTeammembers';
  public AddBlockUnblockTeamMemberToFilingAdminTeam =
    this.domain + 'api/Admin/AddBlockUnblockTeamMemberToFilingAdminTeam';

  public requestfiling = this.domain + 'api/requestfiling';

  // Client Messages section
  public ClientCreateTopicForFiling = this.domain + 'api/client/CreateTopicForFiling';
  public Clienttopicarchive = this.domain + 'api/client/filing/topicarchive';
  public Clientroupmessagearchive = this.domain + 'api/client/filing/groupmessagearchive';
  public Clientgroupsubmessagearchive = this.domain + 'api/client/filing/groupsubmessagearchive';

  //Task Services
  public GetListOfTaskGroups = this.domain + 'api/admin/GetListOfTaskGroups';
  public AddTaskGroup = this.domain + 'api/admin/AddTaskGroup';
  public GetDetailOfTaskGroup = this.domain + 'api/admin/GetDetailOfTaskGroup';
  public DeleteTaskGroup = this.domain + 'api/admin/DeleteTaskGroup';
  public GetListofTaskInTaskGroup = this.domain + 'api/admin/GetListofTaskInTaskGroup';
  public TaskInTaskGroup = this.domain + 'api/admin/TaskInTaskGroup';
  public deletetask = this.domain + 'api/admin/deletetask';
  public MarkTaskAsReviewed = this.domain + 'api/admin/MarkTaskAsReviewed';
  public MarkTaskAsCompleted = this.domain + 'api/admin/MarkTaskAsCompleted';

  //subtasks
  public GetSubTasksInTask = this.domain + 'api/admin/GetSubTasksInTask';
  public SubTaskInTask = this.domain + 'api/admin/SubTaskInTask';
  public deletesubtask = this.domain + 'api/admin/deletesubtask';
  public MarkSubTaskAsReviewed = this.domain + 'api/admin/MarkSubTaskAsReviewed';
  public MarkSubTaskAsCompleted = this.domain + 'api/admin/MarkSubTaskAsCompleted';

  // client subtask mark as completed
  public MarkClientSubTaskAsCompleted = this.domain + 'api/client/MarkSubTaskAsCompleted';
  public MarkClientSubTaskAsReviewed = this.domain + 'api/client/MarkSubTaskAsReviewed';

  //for setting
  public getTeamRoles: string = this.domain + 'api/monitor/GetRoles';
  public GetTeambersOnTeamMemberStatus: string = this.domain + 'api/Admin/GetTeambersOnTeamMemberStatus';
  public GetPrimaryTeamMemberPermissions: string = this.domain + 'api/Admin/GetPrimaryTeamMemberPermissions';
  public GetPrimaryTeamMemberFilingPermissions: string =
    this.domain + 'api/Admin/GetPrimaryTeamMemberFilingPermissions';
  public SetPrimaryTeamMemberPermissions: string = this.domain + 'api/Admin/SetPrimaryTeamMemberPermissions';
  public SetPrimaryTeamMemberDefaultPermissions: string =
    this.domain + 'api/Admin/SetPrimaryTeamMemberDefaultPermissions';
  public SetPrimaryTeamMemberFilingPermissions: string =
    this.domain + 'api/Admin/SetPrimaryTeamMemberFilingPermissions';
  public SetPrimaryTeamMemberDefaultFilingPermissions: string =
    this.domain + 'api/Admin/SetPrimaryTeamMemberDefaultFilingPermissions';

  public GetPrimaryTeamMemberTemplatePermissions: string =
    this.domain + 'api/Admin/GetPrimaryTeamMemberTemplatePermissions'; //19
  public SetPrimaryTeamMemberTemplatePermissions: string =
    this.domain + 'api/Admin/SetPrimaryTeamMemberTemplatePermissions';
  public SetPrimaryTeamMemberDefaultTemplatePermissions: string =
    this.domain + 'api/Admin/SetPrimaryTeamMemberDefaultTemplatePermissions';

  public GetPrimaryTeamMemberDocumentLibraryPermissions: string =
    this.domain + 'api/Admin/GetPrimaryTeamMemberDocumentLibraryPermissions'; //
  public SetPrimaryTeamMemberDocumentLibraryPermissions: string =
    this.domain + 'api/Admin/SetPrimaryTeamMemberDocumentLibraryPermissions';

  public SetPrimaryTeamMemberDefaultDocumentLibraryPermissions: string =
    this.domain + 'api/Admin/SetPrimaryTeamMemberDefaultDocumentLibraryPermissions';

  public GetTeamMemberFilingPermissions: string = this.domain + 'api/Admin/GetTeamMemberFilingPermissions';
  public SetTeamMemberFilingPermissions: string = this.domain + 'api/Admin/SetTeamMemberFilingPermissions';
  public SetTeamMemberFilingDefaultPermissions: string =
    this.domain + 'api/Admin/SetTeamMemberFilingDefaultPermissions';

  // api's for Primary Admin Permissions
  // for Getting
  public GetPrimaryAdminTeamMemberPermissions: string = this.domain + 'api/Admin/PrimaryTeamMemberPermissions'; // 17

  //#region for client api calls
  public GetClinetFilings: string = this.domain + 'api/client/GetConnectedFilings';
  public ClientRoles: string = this.domain + 'api/client/getrole';
  public ClientCreateFiling: string = this.domain + 'api/client/CreatFiling';

  //#endregion

  // Organisation Details
  public primaryattorney: string = this.domain + 'api/admin/settings/primaryattorney';
  public getprimaryattorney: string = this.domain + 'api/admin/settings/getprimaryattorney';
  public contactinformation: string = this.domain + 'api/admin/settings/contactinformation';
  public getcontactinformation: string = this.domain + 'api/admin/settings/getcontactinformation';

  // Account
  public getaccountdata: string = this.domain + 'api/admin/setting/getaccountdata ';
  public changeaccountpassword: string = this.domain + 'api/admin/setting/changeaccountpassword ';
  public changeaccountdata: string = this.domain + 'api/admin/setting/changeaccountdata';
  public getcontactdata: string = this.domain + 'api/admin/setting/GetAdminContactDetails';
  public accountDataSave: string = this.domain + 'api/admin/setting/AddContactDetails';

  // api for client filings section
  public filingApplicantData: string = this.domain + 'api/client/getapplicantforparticularfilingtoapprove';
  public approveApplicantForFiling: string = this.domain + 'api/client/ApproveApplicantForFiling';
  public AssignApplicantForFiling: string = this.domain + 'api/client/AssignApplicantForFiling';
  public adminTeam: string = this.domain + 'api/client/teammembers/getadminteam';
  public clientTeam: string = this.domain + 'api/client/teammembers/getclientteam';
  public applicantsList: string = this.domain + 'api/client/TeamMemsListOnRole?teammemberstatus=4';

  // api for files and folders section
  public clientFileUpload = this.domain + 'api/client/filing/filesupload';
  public clientlistOfFiles = this.domain + 'api/client/filing/listoffilesforfiling';
  public clientViewFile = this.domain + 'api/client/filing/Viewfiles';
  public clientFolderCreation = this.domain + 'api/client/filing/foldercreation';
  public clientFoldersList = this.domain + 'api/client/filing/listoffolders';
  public clientFolderFileUpload = this.domain + 'api/client/filing/folder/filesupload';
  public clientTopics = this.domain + 'api/client/GetTopicsForFilings';
  public clientFolderFilesList = this.domain + 'api/client/filing/listoffilesinfolders';
  public Clientfolderdelete = this.domain + 'api/client/filing/folderdelete';

  // api for overview client section
  public clientApplicantData = this.domain + 'api/client/filing/overview/GetApplicantDetail';
  public clientSponserData = this.domain + 'api/client/filing/overview/GetSponserDetail';
  public clientOrganizationData = this.domain + 'api/client/filing/overview/GetAdminOrgDetails';
  public clientActivitis = this.domain + 'api/client/filing/overview/Activityinfo';
  public clientFilingData = this.domain + 'api/client/filing/overview/GetFilingDetails';
  public clientAddNote = this.domain + 'api/client/filing/overview/AddNote';
  public clientNotesList = this.domain + 'api/client/filing/overview/GetListOfNotes';
  public clientShipementData = this.domain + 'api/client/filing/overview/GetShipmentTrackingList';
  public clientDeleteshipmenttrackingnumber = this.domain + 'api/client/deleteshipmenttrackingnumber';
  public clientAddShipmentNumber = this.domain + 'api/client/filing/overview/ShipMentTrackingNumber';

  public clientUpcomingTasks = this.domain + 'api/client/filing/overview/UpComingTasks';
  public clientSummartTasks = this.domain + 'api/client/filing/overview/TaskSummary';
  public Clientdeletefile = this.domain + 'api/client/filing/deletefile';

  //api for case clinet section
  public GetConnectedFilings = this.domain + 'api/client/GetConnectedFilings';
  public GetFilesInSupportingFilesSectionClient = this.domain + 'api/client/case/GetFilesInSupportingFilesSection';

  // api for tasks client section
  public clientGetListOfTaskGroups = this.domain + 'api/client/GetListOfTaskGroups';
  public clientAddTaskGroup = this.domain + 'api/client/AddTaskGroup';
  public clientAddTask = this.domain + 'api/admin/AddTask';
  public clientEditTask = this.domain + 'api/client/EditTask';
  public clientGetDetailOfTaskGroup = this.domain + 'api/client/GetDetailOfTaskGroup';
  public clientDeleteTaskGroup = this.domain + 'api/client/DeleteTaskGroup';
  public clientGetListofTaskInTaskGroup = this.domain + 'api/client/GetListofTaskInTaskGroup';
  public clientTaskInTaskGroup = this.domain + 'api/admin/TaskInTaskGroup';
  public clientdeletetask = this.domain + 'api/client/deletetask';
  public clientMarkTaskAsReviewed = this.domain + 'api/client/MarkTaskAsReviewed';
  public clientMarkTaskAsCompleted = this.domain + 'api/client/MarkTaskAsCompleted';

  // subtasks
  public clientGetSubTasksInTask = this.domain + 'api/client/GetSubTasksInTask';
  public clientSubTaskInTask = this.domain + 'api/admin/SubTaskInTask';
  public clientEditSubTask = this.domain + 'api/client/EditSubTask';
  public clientAddSubtask = this.domain + 'api/client/addsubTask';
  public clientdeletesubtask = this.domain + 'api/client/deletesubtask';
  public clientMarkSubTaskAsReviewed = this.domain + 'api/admin/MarkSubTaskAsReviewed';
  public clientMarkSubTaskAsCompleted = this.domain + 'api/client/MarkSubTaskAsCompleted';

  //***********client section permission apis */

  public clientRoles: string = this.domain + 'api/monitor/GetRoles';
  public ClientGetTeambersOnTeamMemberStatus: string = this.domain + 'api/client/GetTeambersOnTeamMemberStatus';
  public ClientGetTeamManagementPermissions: string =
    this.domain + 'api/client/permissions/GetTeamManagementPermissions';
  public ClientSetTeamManagementPermissions: string =
    this.domain + 'api/client/permissions/SetTeamManagementPermissions';
  public ClientgetFilingPermissions: string = this.domain + 'api/client/permission/getFilingPermissions';
  public ClientSetFilingPermissions: string = this.domain + 'api/client/permissions/SetFilingPermissions';
  public ClientGetTemplatePermissions: string = this.domain + 'api/client/permissions/GetTemplatePermissions'; //19
  public ClientSetTemplatePermissions: string = this.domain + 'api/client/permissions/SetTemplatePermissions';
  public ClientGetDocumentLibraryPermissions: string =
    this.domain + 'api/client/permissions/GetDocumentLibraryPermissions'; //
  public ClientSetDocumentLibraryPermissions: string =
    this.domain + 'api/client/permissions/SetDocumentLibraryPermissions';

  //Address in settings component client information

  public clientMailingAddress: string = this.domain + 'api/client/ContactinfoMailingAddress';
  public getClientMailingAddress: string = this.domain + 'api/client/getContactinfoMailingAddress';

  public addressOfprincipalPlace: string = this.domain + 'api/client/ContactinfoAddressOfPrincipalPlaceOfBusiness';
  public getAddressOfprincipalPlace: string =
    this.domain + 'api/client/getContactinfoAddressOfPrincipalPlaceOfBusiness';

  // Account
  public getclientaccountdata: string = this.domain + 'api/client/setting/getaccountdata ';
  public changeclientaccountpassword: string = this.domain + 'api/client/setting/changeaccountpassword ';
  public changeclientaccountdata: string = this.domain + 'api/client/setting/changeaccountdata';

  //api calls for connections
  public ConnectionInvite: string = this.domain + 'api/client/ConnectionsInvitation';
  public InvitedByMeConnections: string = this.domain + 'api/clients/GetInvitedConnections';
  public ConnectionsList: string = this.domain + 'api/client/getConnections';
  public ResendCancelConnectionInvite: string = this.domain + 'api/clients/ResendOrDeleteConnectionInvitation';
  public InvitesForMe: string = this.domain + 'api/clients/GetIncomingConnections';
  public ConnectionSignup: string = this.domain + 'api/client/AdminSetUpByLawofficeClientOrgLink';
  public AcceptRejectIncomingConnection: string = this.domain + 'api/clients/AcceptRejectIncomingConnection';
  public AcceptRejectAdminIncomingConnection: string = this.domain + 'api/Admin/AcceptRejectIncmngClient';

  //Applicant
  //personal details
  public getApplicantPersonalDetails: string = this.domain + 'api/client/GetApplicantPersonalDetails';
  public ApplicantPersonalDetails: string = this.domain + 'api/client/ApplicantPersonalDetails';

  public getApplicantEducationalnfo: string = this.domain + 'api/client/GetApplicantEducationDetails';
  public applicantEducationDetails: string = this.domain + 'api/client/ApplicantEducationDetails';

  public applicantAddressAndContact: string = this.domain + 'api/client/ApplicantAddressAndContact';
  public getApplicantAddressAndContact: string = this.domain + 'api/client/GetApplicantAddressAndContact';

  // immigreation passportOrtravelDocument
  public immigrationTravelDetails: string = this.domain + 'api/client/ApplicantImmigrationDetailsPassport';
  public getImmigrationTravelDetails: string = this.domain + 'api/client/GetApplicantImmigrationDetailsPassport';

  // applicant education
  public deleteApplicantEducationInfo: string = this.domain + 'api/client/DeleteApplicantEducationDetails';
  public uploadEmployementFiles: string = this.domain + 'api/client/ApplicantEmployementFiles';
  public getEmployementFiles: string = this.domain + 'api/client/GetApplicantEmployementFiles';
  public deleteEmployementFiles: string = this.domain + 'api/client/DeleteApplicantEmployementFiles';
  public viewEmployementFile: string = this.domain + 'api/client/GetApplicantEmployementFiles';

  // applicant period of stay
  public deleteApplicantPeriodofStayInfo: string = this.domain + 'api/client/DeleteApplicantPOSDetails';
  public postPosInfo: string = this.domain + 'api/client/ApplicantPeriodOfStay';
  public getPosInfo: string = this.domain + 'api/client/GetApplicantPeriodOfStay';
  //form api
  public getImmigrationFormData: string = this.domain + 'api/getImmigrationFormData';
  public saveImmigrationFormData: string = this.domain + 'api/saveImmigrationFormData';
  public previewImmigrationFormData: string = this.domain + 'api/previewImmigrationFormData';

  // case submissions
  public getCaseSubmissionsApiUrl: string = this.domain + 'api/admin/case/getcasedetails';
  public postCaseSubmissionsApiUrl: string = this.domain + 'api/admin/case/createcase';
  public editCaseDetails: string = this.domain + 'api/admin/case/updatecase';
  public deleteCaseSubmissionsApiUrl: string = this.domain + 'api/admin/case/deletecase';
  public caseSubmissionPrivacy: string = this.domain + 'api/admin/case/caseviewPermission';

  // client side
  public getCaseSubmissions: string = this.domain + 'api/client/case/getcasedetails';

  // json templates aps
  public getUIControlTemplateToShowSections: string = this.domain + 'api/data/getUIControlTemplateToShowSections';

  public getTemplatesForSection: string = this.domain + 'api/data/GetTemplatesForSection';

  public getDefaultTemplates: string = this.domain + 'api/data/GetDefaultTemplates';
  public saveUIControlTemplateResults: string = this.domain + 'api/data/SaveUIControlTemplateResults';

  public getUIControlTemplateResultsUrl: string = this.domain + 'api/data/GetUIControlTemplateResults';

  public getFilingTemplates: string = this.domain + 'api/data/getFilingTemplates';

  public saveTemplateOptions: string = this.domain + 'api/data/SaveCustomConfiguredTemplate';
  public getSaveTemps: string = this.domain + 'api/data/getCustomConfiguredTemplate';
  public deleteTemplateUrl: string = this.domain + 'api/data/DeleteCustomConfiguredTemplate';
}
