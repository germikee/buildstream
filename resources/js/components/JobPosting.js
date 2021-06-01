import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import get from 'lodash/get';

class JobPosting extends Component {
  constructor (props) {
    super(props)
      this.state = {
        toast: false,
        selectedJob: null,
        type: 'accept',
        email: '',
        daily_rate: 0,
        jobs: [],
        errors: null
      }

      this.onTypeChange = this.onTypeChange.bind(this);
      this.onSubmitButton = this.onSubmitButton.bind(this);
  }

  onTypeChange (e) {
      this.setState({
          [e.target.name]: e.target.value
      });
  }

  async onSubmitButton(e) {
      e.preventDefault();

      try {
        const { data } = await axios.post(`/api/jobs/${this.state.selectedJob.id}/response`, {
            email: this.state.email,
            type: this.state.type,
            daily_rate: this.state.daily_rate
        })

        this.setState({
          toast: true,
          selectedJob: null,
          email: '',
          type: 'accept',
          daily_rate: 0,
        })
      } catch ({ response: { data } }) {
        this.setState({ errors: data.errors })
      }
  }

  async componentDidMount () {
    const { data: { data } } = await axios.get('api/jobs')

    this.setState({ jobs: data })
  }

  render () {
    return (
        <div className="flex flex-col">
          { this.state.toast &&
            <div className="rounded-md bg-green-50 p-4 my-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Submitted job respond
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button type="button" className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600" onClick={() => this.setState({ toast: false })}>
                      <span className="sr-only">Dismiss</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          { !this.state.selectedJob &&
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Daily Rate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Created
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.jobs.map((job, index) => {
                        return (
                          <tr className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {job.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {job.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {`$${job.daily_rate.toFixed(2)}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {moment(job.created_at).format('LLL')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => {this.setState({ selectedJob: job })}}>Respond</a>
                            </td>
                          </tr>
                        )
                      })}
                      {this.state.jobs.length == 0 &&
                        <tr><td colSpan="5" className="px-6 bg-white py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">No job posting</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }
          { this.state.selectedJob &&
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="mx-auto flex items-center justify-center">
                      <h1 className="text-4xl rounded-full p-2 bg-green-100 flex ">{`$${this.state.selectedJob.daily_rate.toFixed(2)}`}</h1>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {this.state.selectedJob.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {this.state.selectedJob.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <div>
                      <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1">
                        <input type="text" name="email" id="email" className="p-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com" onChange={this.onTypeChange} />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">{get(this.state, 'errors.email.0')}</p>
                    </div>
                    <div className="mt-4">
                      <label for="type" className="block text-sm font-medium text-gray-700">Type</label>
                      <div className="mt-1">
                        <select name="type" id="type" className="p-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={this.onTypeChange}>
                          <option value="accept">Accept</option>
                          <option value="bid">Bid</option>
                          <option value="reject">Reject</option>
                        </select>
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="type-error">{get(this.state, 'errors.type.0')}</p>
                    </div>
                    { this.state.type === 'bid' &&
                      <div className="mt-4">
                        <label for="daily_rate" className="block text-sm font-medium text-gray-700">Price</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input type="text" name="daily_rate" id="daily_rate" className="border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" aria-describedby="price-currency" onChange={this.onTypeChange} />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                              USD
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-red-600" id="rate-error">{get(this.state, 'errors.daily_rate.0')}</p>
                      </div>
                    }
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm" onClick={this.onSubmitButton}>
                      Submit
                    </button>
                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm" onClick={() => {this.setState({ selectedJob: null })}}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

    )
  }
}

export default JobPosting;
if (document.getElementById('job-posting')) {
    ReactDOM.render(<JobPosting />, document.getElementById('job-posting'));
}
