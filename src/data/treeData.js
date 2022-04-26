export const example = [
  // root
  {
    privileges: ['ROLE_MASTER_READ', 'ROLE_MASTER_WRITE'],
    id: 1,
    name: 'Root',
    parentId: 0,
  },
  {
    privileges: ['ROLE_MASTER_DOMAIN_READ', 'ROLE_MASTER_DOMAIN_WRITE'],
    id: 2,
    name: 'item1',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_CLUSTER_READ', 'ROLE_MASTER_CLUSTER_WRITE'],
    id: 3,
    name: 'item2',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_SERVER_READ', 'ROLE_MASTER_SERVER_WRITE'],
    id: 4,
    name: 'item3',
    parentId: 1,
  },
  {
    privileges: [
      'ROLE_MASTER_SERVERTEMPLATE_READ',
      'ROLE_MASTER_SERVERTEMPLATE_WRITE',
    ],
    id: 5,
    name: 'item4',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_RESOURCE_READ', 'ROLE_MASTER_RESOURCE_WRITE'],
    id: 6,
    name: 'item5',
    parentId: 1,
  },
  {
    privileges: [
      'ROLE_MASTER_RESOURCE_MAIL_READ',
      'ROLE_MASTER_RESOURCE_MAIL_WRITE',
    ],
    id: 9,
    name: 'item6',
    parentId: 6,
  },
  {
    privileges: [
      'ROLE_MASTER_APPLICATION_READ',
      'ROLE_MASTER_APPLICATION_WRITE',
    ],
    id: 7,
    name: 'item7',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_STATUS_READ', 'ROLE_MASTER_STATUS_WRITE'],
    id: 8,
    name: 'item8',
    parentId: 1,
  },
  // root
  {
    privileges: ['ROLE_JEUS_READ', 'ROLE_JEUS_WRITE'],
    id: 100,
    name: 'root2',
    parentId: 0,
  },
  {
    privileges: ['ROLE_JEUS_OVERVIEW_READ', 'ROLE_JEUS_OVERVIEW_WRITE'],
    id: 101,
    name: 'item9',
    parentId: 100,
  },
  {
    privileges: ['ROLE_JEUS_SERVER_READ', 'ROLE_JEUS_SERVER_WRITE'],
    id: 102,
    name: 'item10',
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
