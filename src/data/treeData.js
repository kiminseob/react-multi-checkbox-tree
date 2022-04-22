export const example = [
  // root
  {
    privileges: ['ROLE_MASTER_READ', 'ROLE_MASTER_WRITE'],
    id: 1,
    name: 'Master',
    parentId: 0,
  },
  {
    privileges: ['ROLE_MASTER_DOMAIN_READ', 'ROLE_MASTER_DOMAIN_WRITE'],
    id: 2,
    name: 'Domain',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_CLUSTER_READ', 'ROLE_MASTER_CLUSTER_WRITE'],
    id: 3,
    name: 'Cluster',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_SERVER_READ', 'ROLE_MASTER_SERVER_WRITE'],
    id: 4,
    name: 'Server',
    parentId: 1,
  },
  {
    privileges: [
      'ROLE_MASTER_SERVERTEMPLATE_READ',
      'ROLE_MASTER_SERVERTEMPLATE_WRITE',
    ],
    id: 5,
    name: 'ServerTemplate',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_RESOURCE_READ', 'ROLE_MASTER_RESOURCE_WRITE'],
    id: 6,
    name: 'Resource',
    parentId: 1,
  },
  {
    privileges: [
      'ROLE_MASTER_RESOURCE_MAIL_READ',
      'ROLE_MASTER_RESOURCE_MAIL_WRITE',
    ],
    id: 9,
    name: 'Mail Resource',
    parentId: 6,
  },
  {
    privileges: [
      'ROLE_MASTER_APPLICATION_READ',
      'ROLE_MASTER_APPLICATION_WRITE',
    ],
    id: 7,
    name: 'Application',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_STATUS_READ', 'ROLE_MASTER_STATUS_WRITE'],
    id: 8,
    name: 'Status',
    parentId: 1,
  },
  // root
  {
    privileges: ['ROLE_JEUS_READ', 'ROLE_JEUS_WRITE'],
    id: 100,
    name: 'Jeus',
    parentId: 0,
  },
  {
    privileges: ['ROLE_JEUS_OVERVIEW_READ', 'ROLE_JEUS_OVERVIEW_WRITE'],
    id: 101,
    name: 'Overview',
    parentId: 100,
  },
  {
    privileges: ['ROLE_JEUS_SERVER_READ', 'ROLE_JEUS_SERVER_WRITE'],
    id: 102,
    name: 'Server',
    parentId: 100,
  },
];

export const userRole = [
  // root
  {
    privileges: ['ROLE_AUTH_ADMIN_READ', 'ROLE_AUTH_ADMIN'],
    id: 1,
    name: 'ROLE_AUTH_ADMIN',
    parentId: 0,
  },
  {
    privileges: ['ROLE_AUTH_USER_READ', 'ROLE_AUTH_USER'],
    id: 2,
    name: 'ROLE_AUTH_USER',
    parentId: 1,
  },
  {
    privileges: ['ROLE_AUTH_ROLE_READ', 'ROLE_AUTH_ROLE'],
    id: 3,
    name: 'ROLE_AUTH_ROLE',
    parentId: 1,
  },
];
