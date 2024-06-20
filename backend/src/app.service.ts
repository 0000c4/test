import { Injectable } from '@nestjs/common';
import { timeConverter } from './utils';

interface lead {
  key: number,
  name: string,
  price: string,
  status: string,
  responsible_user: string,
  created_at: string,
  contacts: Array<Object>
}

const getLeadStatus = async (pipeline_Id: string, status_id: string): Promise<string> => {
  const statusResponse = await fetch(`https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/leads/pipelines/${pipeline_Id}/statuses/${status_id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    }
  });
  const { name } = await statusResponse.json();
  return name
}

const getUser = async (user_id: number): Promise<string> => {
  const userResponse = await fetch(`https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/users/${user_id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    }
  });
  const { name } = await userResponse.json();
  return name
}

const getContacts = async (rawContacts): Promise<Array<Object>> => {
  let users: Array<Object> = []
  if (rawContacts.length > 0) {
    for (const user of rawContacts) {
      const statusResponse = await fetch(`https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/contacts/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      });
      const { name, custom_fields_values } = await statusResponse.json();

      users.push({ name, custom_fields_values })
    }
  }
  return users

}

@Injectable()
export class AppService {
  async getLeads(query: string): Promise<object> {
    try {
      const leadResponse = await fetch(`https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/leads?with=contacts${query && query.length > 3 ? '&query=' + query : ''}`, {
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      });
      const rawLeads = await leadResponse.json();
      let leads: Array<lead> = []
      if (rawLeads._embedded.leads.length > 0) {
        for (const [index, rawLead] of rawLeads._embedded.leads.entries()) {
          leads.push({
            key: index,
            name: rawLead.name,
            price: rawLead.price.toLocaleString(),
            status: await getLeadStatus(rawLead.pipeline_id, rawLead.status_id),
            responsible_user: await getUser(rawLead.responsible_user_id),
            created_at: timeConverter(rawLead.created_at),
            contacts: await getContacts(rawLead._embedded.contacts)
          })
        }
      }
      return leads
    } catch (error) {
      console.log(error)
    }

  }
}
